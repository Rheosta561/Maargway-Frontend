import React, { useState } from 'react';

function Home() {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className='bg-zinc-950 h-screen'>
      <div className='text-8xl text-zinc-50 text-center pt-20 font-semibold md:text-9xl'>
        Maarg<span className='text-emerald-500'>Way</span>
      </div>
      <hr className='w-2/3 mx-auto border rounded-lg mt-4 opacity-75' />
      <div className='text-white text-center text-sm mt-2 opacity-75'>
        Your One Step Learning Path
      </div>
      <div className='text-white text-center text-xs opacity-75'>
        AI Powered Recommendation System
      </div>
      <div className='text-white text-center text-xs opacity-75'>
        Suggestions, Improvisations, etc. all at One Place
      </div>
      <br />
      <br />
      <div className='text-zinc-200 text-center text-6xl md:text-7xl'>Getting Started</div>
      <div className='h-96 w-1/2 bg-transparent border border-zinc-700 opacity-90 mx-auto mt-4 rounded-lg'>
        <form
          onSubmit={handleSubmit}
          className='mx-auto flex flex-col items-center'
        >
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='bg-transparent border border-emerald-700 rounded-lg mt-4 h-14 w-3/4 text-zinc-400 text-2xl text-center'
            required
          />
          <label
            htmlFor='name'
            className='text-emerald-600 opacity-75 mt-2 text-lg'
          >
            Enter Name
          </label>
          <div className='text-center text-emerald-100 opacity-75 text-xs'>
            Your Name is once registered <br /> and stays forever
          </div>
          <input
            type='text'
            name='age'
            value={formData.age}
            onChange={handleChange}
            className='bg-transparent border border-emerald-700 rounded-lg mt-4 h-14 w-3/4 text-zinc-400 text-2xl text-center'
            required
          />
          <label
            htmlFor='age'
            className='text-zinc-500 mt-2 text-lg text-emerald-600 opacity-75'
          >
            Age
          </label>
          <div className='text-center text-emerald-100 opacity-75 text-xs'>
            Your age is required <br /> to find the most accurate path
          </div>
          <button
            type='submit'
            className='bg-emerald-950 text-white mt-6 px-6 py-3 rounded-lg  hover:bg-emerald-600 transition'
          >
            Submit
          </button>
        </form>
      </div>
      <div className='text-white text-center mt-16 opacity-65 absolute bottom-4 w-full'>
    Developed By Anubhav Mishra
  </div>
    </div>
  );
}

export default Home;
