import React, { useState } from 'react';
import { FaEdit, FaSave, FaUser, FaEnvelope, FaCamera, FaSignOutAlt } from 'react-icons/fa';
import {signOut} from 'firebase/auth'
import { auth } from '../Backend/signIn';

const ProfilePage = ({userDetail,setIsAuthenticatedFully}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150'); // Placeholder avatar

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save user info)
    setIsEditing(false);
  };

  const handleLogout = () => {
    if(Object.keys(userDetail).length !== 0 ){
      signOut(auth)
    .then((Res)=>
    { 
      setIsAuthenticatedFully(false)
    }
    ).catch(err=>alert('error logging out'))
    }
    
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isEditing ? 'animate-pulse' : 'animate-none'}`}>
      <div className={`max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl transition-all duration-300 transform ${isEditing ? 'scale-105' : 'scale-100'}`}>
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 flex items-center justify-center">
          <FaUser className="mr-3" /> Profile
        </h2>
        <div className="flex justify-center mb-6">
          <img
            src={`${userDetail.photoURL}`}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-indigo-500"
          />
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center"><FaUser className="mr-3 text-indigo-500" /> Username</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded outline-none"
                  value={userDetail.displayName}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center"><FaEnvelope className="mr-3 text-indigo-500" /> Email</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="email"
                  className="w-full py-2 px-4 rounded outline-none"
                  value={userDetail.email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 flex items-center"><FaCamera className="mr-3 text-indigo-500" /> Avatar</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full py-2 px-4 rounded outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 w-full"
            >
              <FaSave className="mr-2" /> Save
            </button>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-gray-700 flex items-center justify-center"><FaUser className="mr-3 text-indigo-500" /> Username: {userDetail.displayName}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 flex items-center justify-center"><FaEnvelope className="mr-3 text-indigo-500" /> Email: {userDetail.email}</p>
            </div>
            <div className="flex justify-center">
              {/* s */}
              <button
                onClick={()=>handleLogout()}
                className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 flex items-center justify-center"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
