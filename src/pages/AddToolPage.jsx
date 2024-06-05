import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave } from 'react-icons/fi';
import Button2 from '../components/Button2';
import Dropdown from '../components/Dropdown';
import {  database, ID, } from '../Backend';
import Loader from '../components/Loader';

function AddToolPage() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState([]);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [loadingCategoryList, setLoadingCategoryList] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState('');

  const [titleError, setTitleError] = useState('');
  const [detailError, setDetailError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [labelError, setLabelError] = useState('');
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    if (!categoryList.length && !loadingCategoryList) {
      setLoadingCategoryList(true);
      database.listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_CATEGORY_CL)
        .then((res) => {
          setCategoryList(res.documents);
          setLoadingCategoryList(false);
        })
        .catch((err) => {
          setLoadingCategoryList(false);
        });
    }
  }, [categoryList, loadingCategoryList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error messages
    setTitleError('');
    setDetailError('');
    setCategoryError('');
    setLabelError('');
    setUrlError('');

    // Validation checks
    if (!title) {
      setTitleError('Tool name is compulsory');
    }
    if (!detail) {
      setDetailError('Detail is compulsory');
    }
    if (category.length === 0) {
      setCategoryError('At least one category must be selected');
    }
    if (!label) {
      setLabelError('Label is compulsory');
    }
    if (!url) {
      setUrlError('Website URL is compulsory');
    }

    // If any errors, return early
    if (!title || !detail || category.length === 0 || !label || !url) {
      return;
    }

    setLoadingSubmit(true);

    const documentId = ID.unique();
    const documentData = {
      toolName: title,
      detail: detail,
      webUrl: url,
      category: category.join(', '),
      Label: label,
    };

    database.createDocument(import.meta.env.VITE_DB_ID, import.meta.env.VITE_TOOLS_CL, documentId, documentData)
      .then(response => {
        setMessage('Tool added successfully.');
        setTitle('');
        setDetail('');
        setCategory([]);
        setLabel('');
        setUrl('');
      })
      .catch(error => {
        console.error('Error creating document:', error);
        setMessage('Failed to add tool.');
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md border border-gray-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">Tool Name</label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="detail" className="block text-gray-700 mb-2">Detail</label>
          <textarea
            id="detail"
            className="w-full px-3 py-2 border rounded shadow-sm"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
          {detailError && <p className="text-red-500 text-sm mt-1">{detailError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 mb-2">Category</label>
          {loadingCategoryList ? (
            <Loader />
          ) : (
            <Dropdown title="Select Category" options={categoryList} setCategory={setCategory} category={category} />
          )}
          {categoryError && <p className="text-red-500 text-sm mt-1">{categoryError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="label" className="block text-gray-700 mb-2">Label</label>
          <input
            id="label"
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          {labelError && <p className="text-red-500 text-sm mt-1">{labelError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 mb-2">Website URL</label>
          <input
            id="url"
            type="url"
            className="w-full px-3 py-2 border rounded shadow-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
        </div>
        <div className="text-center mb-4">
          {message}
        </div>
        <Button2 name={loadingSubmit ? 'Saving...' : 'Save'} className="bg-indigo-500 hover:bg-indigo-600" disabled={loadingSubmit} />
      </form>
    </motion.div>
  );
}

export default AddToolPage;
