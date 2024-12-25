import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GenAi({userid}) {
    const [data, setdata] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchdata =  async()=>{
            try {
                const response = await axios.get(`https://maargway-backend.onrender.com/${userid}`);
                setdata(response.data);
                setLoading(false);


            
            } catch (error) {
                console.error("something went wrong",error);
                setLoading(false);
                
            }
           
        }
        fetchdata();

        },[userid]);
        

  return (
    <div className='w-full border border-dashed border-zinc-500 h-fit flex p-2 gap-3'>
    <div className='w-52 h-52 md:w-64 md:h-64 bg-purple-900 flex-shrink-0 '>
    {loading ? (
                    <div className="h-full w-full bg-gray-200 animate-pulse">
                    </div>
                ) : (
                    <img 
                        src="https://cdn.pixabay.com/photo/2022/06/24/17/35/relaxation-7282116_1280.jpg" 
                        alt="Relaxation" 
                        className='h-full w-full object-cover opacity-90' 
                    />
                )}
    </div>
    <div className='flex flex-col text-3xl md:text-4xl overflow-hidden'>
        
    {loading ? (
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 mb-2"></div>
                        <div className="h-4 bg-gray-200 mb-2"></div>
                    </div>
                ) : (
                    <>
                        <div className='font-semibold text-gray-200'>{data.heading}</div>
                        <hr className='border rounded-lg border-zinc-300 mt-1 mb-2' />
                        <div className='text-xs text-gray-300'>
                            {data.desc}
                        </div>
                    </>
                )}
    </div>
</div>

  )
}

export default GenAi