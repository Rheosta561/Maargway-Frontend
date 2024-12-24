import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://maargway-backend.onrender.com/createStudent', formData);
      console.log('User Created:', response.data.newStudent);
      const name = response.data.newStudent.name;
      navigate(`/${name}`, { state: { formData: response.data.newStudent } });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="bg-zinc-950 h-screen w-screen overflow-hidden flex flex-col justify-center items-center">
      <div className="text-6xl text-zinc-50 text-center font-semibold md:text-8xl">
        Maarg<span className="text-emerald-500">Way</span>
      </div>
      <hr className="w-11/12 md:w-2/3 mx-auto border rounded-lg mt-4 opacity-75" />
      <div className="text-white text-center text-sm mt-2 opacity-75">
        Your One Step Learning Path
      </div>
      <div className="text-white text-center text-xs opacity-75">
        AI Powered Recommendation System
      </div>
      <div className="text-white text-center text-xs opacity-75">
        Suggestions, Improvisations, etc. all at One Place
      </div>
      <div className="text-emerald-100 text-center text-3xl md:text-5xl mt-6">
        Getting Started
      </div>
      <div className="h-auto w-11/12 md:w-1/2 bg-transparent border border-zinc-700 opacity-90 mx-auto mt-4 rounded-lg p-6">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex flex-col items-center space-y-6"
        >
          <div className="w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border border-emerald-700 rounded-lg h-14 w-full text-zinc-400 text-2xl text-center"
              required
              placeholder="Enter your name"
            />
            <label
              htmlFor="name"
              className="text-emerald-600 opacity-75 mt-2 text-center text-lg block"
            >
              Enter Name
            </label>
            <p className="text-center text-emerald-100 opacity-75 text-xs">
              Your Name is once registered and stays forever
            </p>
          </div>
          <div className="w-full">
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="bg-transparent border border-emerald-700 rounded-lg h-14 w-full text-zinc-400 text-2xl text-center"
              required
              placeholder="Enter your age"
            />
            <label
              htmlFor="age"
              className="text-emerald-600 opacity-75 mt-2 text-center text-lg block"
            >
              Age
            </label>
            <p className="text-center text-emerald-100 opacity-75 text-xs">
              Your age is required to find the most accurate path
            </p>
          </div>
          <button
            type="submit"
            className="bg-emerald-950 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="text-white text-center mt-12 opacity-65">
        Developed By Anubhav Mishra
      </div>
    </div>
  );
}

export default Home;
