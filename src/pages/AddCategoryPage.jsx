import React, { useState } from 'react';
import Button2 from '../components/Button2';
import { database, ID } from '../Backend';
import Loader from '../components/Loader';

function AddCategoryPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    const docId = ID.unique();
    database
      .createDocument(import.meta.env.VITE_DB_ID, import.meta.env.VITE_CATEGORY_CL, docId, { name: name })
      .then(response => {
        setMessage('Category added successfully.');
        setName(''); // Clear the input field
      })
      .catch(error => {
        console.error('Error creating document:', error);
        setMessage('Failed to add category.');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the operation is complete
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 mb-4">{loading ? <Loader /> : message}</div>
          <Button2 name={loading ? 'Saving...' : 'Save'} className="w-full" disabled={loading} />
        </form>
      </div>
    </div>
  );
}

export default AddCategoryPage;
