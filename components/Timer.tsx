import { Minus } from 'lucide-react'
import React from 'react'

function Timer({now}:{now:string}) {
  return (
    <section className='flex flex-row md:gap-6 justify-center items-center'>
        <div className=' flex flex-col items-center justify-center'>
            <span className='text-md md:text-lg opacity-70 text-white'>Semanas</span>
            <span className='md:text-8xl text-4xl md:text:6xl font-bold text-white'>00</span>
        </div>
        <span className='text-white'><Minus className='w-[5vw] h-[5vw] opacity-70'/></span>
        <div className=' flex flex-col items-center justify-center'>
            <span className='text-md md:text-lg opacity-70 text-white'>Dias</span>
            <span className='md:text-8xl text-4xl md:text:6xl  font-bold text-white'>00</span>
        </div>
        <span className='text-white'><Minus className='w-[5vw] h-[5vw] opacity-70'/></span>
        <div className=' flex flex-col items-center justify-center'>
            <span className='text-md md:text-lg opacity-70 text-white'>Horas</span>
            <span className='md:text-8xl text-4xl md:text:6xl font-bold text-white'>00</span>
        </div>
        <span className='text-white'><Minus className='w-[5vw] h-[5vw] opacity-70'/></span>
        <div  className=' flex flex-col items-center justify-center'>
            <span className='text-md md:text-lg opacity-70 text-white'>Minutos</span>
            <span className='md:text-8xl text-4xl md:text:6xl  font-bold text-white'>00</span>
        </div>              
    </section>
  )
}

export default Timer