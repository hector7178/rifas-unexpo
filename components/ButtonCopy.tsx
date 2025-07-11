"use client"
import { Clipboard } from 'lucide-react';
import React from 'react';

const ButtonCopy = ({data}:{data:string}) => {
    return (
        <div className='w-fit h-fit p-2 hover:scale-105'>
            <Clipboard className='w-8 h-8 p-2 rounded bg-primary text-white' onClick={async ()=>{
                    
                    await navigator.clipboard.writeText(data);
                    alert('Text copied');
                
          }}/>
        </div>
    );
}

export default ButtonCopy;
