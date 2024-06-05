import React, { useState, useEffect } from 'react';
import ProjectCardMain from '../components/ProjectCardMain';
import { database  } from '../Backend';
import Loader from '../components/Loader';

function HomePage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    database
      .listDocuments(import.meta.env.VITE_DB_ID, import.meta.env.VITE_TOOLS_CL)
      .then((res) => {
        setTools(res.documents);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching tools:', error);
        setLoading(false); // Set loading to false even in case of error
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      {loading ? ( // Conditionally render Loader while loading is true
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ProjectCardMain key={tool?.$id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
