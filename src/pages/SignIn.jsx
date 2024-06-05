import React, { useState } from 'react';
import { auth, provider } from '../Backend/signIn';
import { signInWithPopup } from 'firebase/auth';
import { RiGoogleFill } from 'react-icons/ri';
import 'tailwindcss/tailwind.css';
import signInImage from '../assets/bg-5.jpeg'; // Import the image

function SignIn({setIsAuthenticated,setUserDetail}) {
    const [val, setVal] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                setVal(res);
                setIsAuthenticated(true)
                setUserDetail(res?.user)
            })
            .catch((error) => {
                // Handle sign-in errors
                setIsAuthenticated(false)
                console.error(error);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen relative">
            <img src={signInImage} alt="" className="absolute inset-0 object-cover w-full h-full z-0" />
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded shadow-md text-center relative z-10">
                {/* Sign-in form */}
                <div className="relative">
                    <h2 className="text-3xl font-semibold text-white mb-4">Welcome!!</h2>
                    <button
                        onClick={handleClick}
                        className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded flex items-center justify-center w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 ${isHovered ? 'transform scale-105' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <RiGoogleFill className="text-2xl text-white mr-2" />
                        Sign in with Google
                    </button>
                    <p className="text-sm text-gray-200 mt-2">Click the button above to sign in using your Google account.</p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
