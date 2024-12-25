import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecCard from './RecCard';
import { useParams } from 'react-router-dom';

function Recommendations({ userId }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userid}= useParams();

  // Fetch workshops when the component mounts
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(`https://maargway-backend.onrender.com/students/${userid}/recommendedWorkshops`);
        setWorkshops(response.data.recommendedWorkshops);
      } catch (err) {
        setError('Error fetching workshops');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [userId]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-zinc-950">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-4 border-t-4 border-emerald-900 border-solid rounded-full animate-spin"></div>
            <div className="text-white text-xl">Loading...</div>
          </div>
        </div>
      );
      
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='bg-zinc-950 p-4 min-h-screen text-white'>
      <div className='text-center text-7xl'>Greetings</div>
      <div className='text-center text-sm mt-2 text-zinc-300'>The Recommendations Based</div>
      <div className='text-center text-sm text-zinc-400'>On Your Profile are Here Rightaway</div>
      <br />
      <br />
      <div className='text-4xl'>Recommended Workshops</div>
      <div className='text-xs mt-1 text-zinc-300'>
        The Recommended Workshops based on Your Preferences
        <hr className=' rounded-lg border border-zinc-400 mt-1 border-dashed'/>
      </div>

      {/* Display workshops */}
      <div className='grid grid-cols-1 gap-2 md:grid-cols-3 p-2'>
        {workshops.map((workshop, index) => (
          <RecCard key={index} workshop={workshop} userId={userid} />
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
