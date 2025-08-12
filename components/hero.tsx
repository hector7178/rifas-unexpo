"use client"

import Image from "next/image";
import Altar from "./Altar";
import moto300 from "./../app/public/moto300X300.png"
import moto600 from "./../app/public/moto600X600.png"
import logopromo from "./../app/public/promo.png"
import AnimateButton from "./Animate-button";

export default function Header() {
  return (
    <div className="relative flex flex-col md:flex-row gap-4  justify-start items-center w-full h-fit min-h-[90dvh] bg-background "  >
        
      
      <div className="basis-1/2 h-fit flex flex-col gap-6 items-center justify-center relative z-10">
        <h1 className="font-sans text-white [text-shadow:0_0_7px_#fff,0_0_0px_#fff,0_0_5px_#fff,0_0_2px_#228dff,0_0_35px_#228dff,0_0_10px_#228dff,0_0_50px_#228dff,0_0_5px_#228dff] text-center md:text-8xl text-6xl font-black ">GRAN RIFA</h1>
        <span className="md:text-2xl text-lg font-bold text-foreground text-center">No esperes más y se el ganador de cualquiera de nuestros 7 premios, participa y gana.</span>
        <AnimateButton ruta={"/sign-up"}/>
      </div>
      <div className="basis-1/2 h-full w-full relative z-10 flex items-end">
        <Image alt="moto" src={logopromo} width={600} height={600} className="flex " ></Image>
     
      </div>
      
    </div>
  );
}
