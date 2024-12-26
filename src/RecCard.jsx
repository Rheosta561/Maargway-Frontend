import React, { useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; 


function RecCard({ workshop, userId }) {
    const [liked,setLiked] =useState(false);
    const [disliked , setDisliked]= useState(false);
    const [loading , setLoading] = useState(false);
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
  const setPositiveResponse = async()=>{
    try {
        const response = await axios.put( `https://maargway-backend.onrender.com/${workshop._id}/response/positive`);
        setLoading(true);
        if(response){
            // alert(`liked ${workshop.name}`);
            setLiked(!liked);
            setDisliked(false);
            setLoading(false);
        }
    } catch (error) {
        alert("Something went wrong ",error.message);
        setLoading(false);
        
    }

  }
  const setNegativeResponse = async()=>{
    try {
        const response = await axios.put( `https://maargway-backend.onrender.com/${workshop._id}/response/negative`);
        if(response){
            setDisliked(!disliked);
            setLiked(false);
        }
    } catch (error) {
        alert("Something went wrong ",error.message);
        
    }

  }

  return (
    <div className='h-80 rounded-lg w-full flex  transition-all flex-col bg-zinc-300 p-2'>
      <div className='h-5/6 bg-zinc-950 rounded-lg relative'>
        <img 
          src={workshop.image} 
          alt={workshop.name} 
          className={`bg-red-950 h-full w-full rounded-lg absolute brightness-75 contrast-125 hover:contrast-75 transition-all ${loading ? 'animate-pulse' : ''}`} 
        />
        <div className='relative flex justify-between p-4'>
  <div>
  <button onClick={setPositiveResponse} className={` transition-all ${liked ? 'bg-zinc-50  p-2 rounded-full ' :''}`}>
  <FaThumbsUp className={`text-blue-500 hover:scale-150 transition-all ${liked ? 'text-blue-900 ' :''} ${loading ? 'animate-ping' : ''} `}  /> 

    </button>
    
  </div>
  <div>
    <button onClick={setNegativeResponse} className={` transition-all ${disliked ? 'bg-zinc-50  p-2 rounded-full ' :''}`}>
    <FaThumbsDown className={`text-red-500 hover:scale-150 transition-all ${disliked ? 'text-red-700 ' : ''} ${loading ? 'animate-ping' : ''}`} /> 

    </button>
    
  </div>
</div>
      </div>
      <div className='flex justify-between '>
        <div className='text-zinc-950 text-xl font-semibold flex flex-col'>
            <div className='flex gap-1 items-center'>
               {workshop.name}
               

            </div>
          
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
