import React from 'react';
import axios from 'axios';

function RecCard({ workshop, userId }) {
  const handleRegister = async () => {
    try {
      const response = await axios.post('https://maargway-backend.onrender.com/registerWorkshop', {
        workshopId: workshop._id,
        userId,
      });
      alert(response.data.message);  
    } catch (error) {
      alert('Error registering for the workshop');
    }
  };

  return (
    <div className='h-80 rounded-lg w-full flex hover:scale-105 transition-all flex-col bg-zinc-300 p-2'>
      <div className='h-5/6 bg-zinc-950 rounded-lg'>
        <img 
          src={workshop.image} 
          alt={workshop.name} 
          className='bg-red-950 h-full w-full rounded-lg' 
        />
      </div>
      <div className='flex justify-between'>
        <div className='text-zinc-950 text-xl font-semibold flex flex-col'>
          {workshop.name}
          <div className='text-xs -mt-1 font-normal'>{workshop.desc} | {workshop.price}</div>
        </div>
        <div className='p-2 flex items-center'>
          <button
            className='bg-emerald-950 p-2 rounded-full'
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecCard;
