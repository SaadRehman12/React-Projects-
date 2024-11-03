import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./signup.css";


import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { Signup } from "../../store/slices/authSlice";

export default function Signupcomp() {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [nameError, setNameError] = useState('');  
    const [userError, setUserError] = useState('');
    const [profileError, setProfileError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  //   const dispatch = useDispatch();
   
  
    let schema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      
      profileImage: Yup.mixed()
        .required('Profile image is required')
        .test('fileType', 'Unsupported file format', (value) => !value || (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))),
    
      userName: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username cannot exceed 20 characters')
        .required('Username is required'),
      
      name: Yup.string()
        .min(4, 'Name must be at least 2 characters')
        .required('Name is required')
    });
    
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(file); 
      }
    };
   const dispatch = useDispatch()
   const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault();
      let data = {
        name: name,
        userName: userName, // Corrected to userName
        profileImage: profileImage,
        email: email,
        password: password,
      };
      console.log(data);
      setNameError('');
      setEmailError('');
      setPasswordError('');
      setProfileError('');
      setUserError('');
  
      try {
        await schema.validate(data, { abortEarly: false });
        const resultAction = await dispatch(Signup(data));
        
        if (Signup.fulfilled.match(resultAction)) {
          navigate("/");
  
          setName("");
          setUserName("");
          setProfileImage(null); // Reset image on success
          setEmail("");
          setPassword("");
        }
  
          setName("");
          setUserName("");
          setProfileImage(null); // Reset image on success
          setEmail("");
          setPassword("");
      
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            if (err.path === "name") setNameError(err.message);
            if (err.path === "userName") setUserError(err.message);
            if (err.path === "profileImage") setProfileError(err.message);
            if (err.path === "email") setEmailError(err.message);
            if (err.path === "password") setPasswordError(err.message);
          });
        } else {
          console.log("Validation error", error);
        }
      }
    };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
    <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
      
      <div className="mb-6">
        <label htmlFor="profileImage" className="block font-medium text-gray-700 mb-2">Profile Picture</label>
        <div className="flex items-center justify-center">
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-2xl" />
              )}
            </div>
            <span className="block text-center mt-2 text-sm text-blue-600">
              {profileImage ? "Change Image" : "Upload Image"}
            </span>
          </label>
        </div>
        {profileError && <p className="text-red-500 text-sm mt-2">{profileError}</p>}
      </div>
  
      <div className="mb-6">
        <label htmlFor="name" className="block font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {nameError && <p className="text-red-500 text-sm mt-2">{nameError}</p>}
      </div>
  
      <div className="mb-6">
        <label htmlFor="username" className="block font-medium text-gray-700 mb-2">Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          id="username"
          placeholder="Enter your username"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {userError && <p className="text-red-500 text-sm mt-2">{userError}</p>}
      </div>
  
      <div className="mb-6">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
      </div>
  
      <div className="mb-6">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
      </div>
  
    
  
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Sign Up
      </button>
      <div className="flex justify-end mb-4 mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/SignIn" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  </div>
  
  )
}
