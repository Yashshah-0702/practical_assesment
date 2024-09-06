import React, { useState } from 'react';
import axios from 'axios';
import  apiKey  from '../configs/api.config';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    upload_file: null, 
  });

  const handleChange = (e) => {
    if (e.target.name === 'upload_file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],  // Handle file input
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.firstName);
    formDataToSend.append('last_name', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('birth_date', formData.birthDate);
    formDataToSend.append('upload_file', formData.upload_file);

    try {
      const response = await axios.post(`${apiKey}/user/signup`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if(response.data.code === 422 || response.data.code === 400 || response.data.code === 500) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      navigate('/login')
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Profile Picture</label>
            <input
              type="file"
              name="upload_file"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              accept="image/*"  // Optional: restrict to image files
              
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600 transition duration-200"
          >
            Signup
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
