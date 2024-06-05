import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddCategoryPage from './pages/AddCategoryPage';
import AddToolPage from './pages/AddToolPage';
import HomePage from './pages/HomePage';
import ManageProjects from './pages/ManageProjects';
import ProjectDetail from './pages/ProjectDetail'; 
import ProfilePage from './pages/ProfilePage';
import MainProjectPage from './pages/MainProject';
import MainTaskPage from './pages/MainTaskPage';
import TaskEditRoute from './pages/TaskEditRoute';
import SignIn from './pages/SignIn';
import { database } from './Backend';
import { Query } from 'appwrite';

function App() {
  const navbarRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedFully,setIsAuthenticatedFully] = useState()
  const [userDetail, setUserDetail] = useState([])
  // useEffect(() => {
  //   // Check authentication status from your authentication provider
  //   // For demonstration purposes, let's assume the user is authenticated
  //   setIsAuthenticated(false);
  // }, []);


  useEffect(()=>{
    if(isAuthenticated){
    database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_USER_CL,
      [
        Query.select('$id'),
        Query.equal('email',userDetail?.email)
      ]
    ).then((res)=>{
      if(res?.total === 0){
        setIsAuthenticatedFully(false)
        alert('error loggin in')
      }else if(res?.total === 1){
        setIsAuthenticatedFully(true)
      }
    }).catch((err)=>{
      alert('error loggin in')
    })}

  },[isAuthenticated])



  useEffect(() => {
    if(isAuthenticatedFully){
      const navbarHeight = navbarRef.current.clientHeight;
      const contentBelowNavbar = document.getElementById('content-below-navbar');
      if (contentBelowNavbar) {
        contentBelowNavbar.style.marginTop = `${navbarHeight}px`;
      }

    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticatedFully && <Navbar ref={navbarRef} />}
        <div id="content-below-navbar" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <Routes>
            {/* Redirect to SignIn page if not authenticated */}
            {!isAuthenticatedFully && <Route path="/" element={<SignIn setIsAuthenticated={setIsAuthenticated} setUserDetail={setUserDetail}/> } />}
            {/* Protected routes accessible only after authentication */}
            {isAuthenticatedFully && (
              <>
                <Route path="/" element={<ProfilePage userDetail={userDetail} setIsAuthenticatedFully={setIsAuthenticatedFully}/>} />
                <Route path="/tool" element={<HomePage />} />
                <Route path="/add-category" element={<AddCategoryPage />} />
                <Route path="/add-tool" element={<AddToolPage />} />
                <Route path="/manageProjects" element={<ManageProjects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/projects" element={<MainProjectPage />} />
                <Route path="/task" element={<MainTaskPage />} />
                <Route path="/tasks/:taskId/edit" element={<TaskEditRoute />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
