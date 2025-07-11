"use client"

import Image from "next/image";
import Altar from "./Altar";
import moto300 from "./../app/public/moto300X300.png"
import moto600 from "./../app/public/moto600X600.png"
import Link from "next/link";
import AnimateButton from "./Animate-button";

export default function Header() {
  return (
    <div className="relative flex flex-col md:flex-row gap-4  justify-start items-center w-full h-[90dvh] bg-background "  >
      <div className="w-full h-full bg-gradient-to-t  from-primary from-1% via-transparent via-15% to-transparent to-90% absolute  "></div>
      <div className="w-full h-full bg-gradient-to-b  from-primary from-1% via-transparent via-35% to-transparent to-90% absolute  "></div>
      <div className="absolute top-0  w-full h-full overflow-hidden ">
        <div className='lightDiv x1div'></div>
        <div className='lightDiv x2div'></div>
        <div className='lightDiv x3div'></div>
        <div className='lightDiv x4div'></div>
        <div className='lightDiv x5div'></div>
        <div className='lightDiv x6div'></div>
        <div className='lightDiv x7div'></div>
        <div className='lightDiv x8div'></div>
        <div className='lightDiv x9div'></div>
      </div>
      
      <div className="basis-1/2 h-fit flex flex-col gap-6 items-center justify-center relative z-10">
        <h1 className="font-sans text-primary-foreground md:text-primary  text-center md:text-8xl text-6xl font-black ">GRAN RIFA</h1>
        <span className="md:text-2xl text-lg font-bold text-foreground text-center">No esperes más y se el ganador de cualquiera de nuestros 7 premios, participa y gana.</span>
        <AnimateButton ruta={"/sign-up"}/>
      </div>
      <div className="basis-1/2 h-full w-full relative z-10 flex items-end">
        <Altar className="absolute -bottom-[16vh] md:-bottom-[24vh] lg:-bottom-[34vh] w-full h-full md:h-3/4"/>
        <div className="flex items-center justify-center w-full md:h-fit ">
        <Image alt="moto" src={moto300} width={300} height={300} className="lg:hidden flex " style={{filter:"drop-shadow(0 10px 5px black)"}}></Image>
        </div>
        <Image alt="moto" src={moto600} width={600} height={600} className="hidden lg:flex md:left-0 left-[12%] -bottom-[24vh] z-100 absolute" style={{filter:"drop-shadow(0 10px 5px black)"}}></Image>
    

      </div>
      
    </div>
  );
}
