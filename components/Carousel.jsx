import React from 'react';

import moto300 from "./../app/public/moto300X300.png"
import Image from 'next/image';
const CarouselInfinite = () => {
    return (
        <section className="carousel w-full h-full">

  <div className="flex px-0 w-full h-full">
    
      <div className="h-full w-full">
        <div className="carousel__wrapper">
            
        {[{img:moto300,title:"PRIMER PREMIO"}, {img:"",title:"SEGUNDO PREMIO"},{img:"",title:"PREMIO ADICIONAL"},{img:"",title:"PREMIO ADICIONAL"},{img:"",title:"PREMIO ADICIONAL"},{img:"",title:"MAYOR VENTAS"},{img:"",title:"PRIMER PREMIO"}, {img:"",title:"SEGUNDO PREMIO"},{img:"",title:"PREMIO ADICIONAL"},{img:"",title:"PREMIO ADICIONAL"},{img:"",title:"PREMIO ADICIONAL"},{img:"",title:"MAYOR VENTAS"}].map((item,index)=> {
            return (<div key={index} className=' carousel__slide relative  w-[30vw] min-w-[250px] h-[30vw] min-h-[250px] bg-red-200 '>
                <span className='absolute top-2 left-2 text-lg text-white'>{item?.title}</span>
                {item?.img && <Image alt='moto primer premio' width={300} height={300} src={item.img} className='w-full h-full'/>}
                </div>)
        })}

        </div>
      </div>
    </div>

</section>
    );
}

export default CarouselInfinite;
