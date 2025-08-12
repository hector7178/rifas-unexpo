import Hero from "@/components/hero";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Button } from "../components/ui/button";
import { SubmitButton } from "../components/submit-button";
import Link from "next/link";
import Wsp from "../components/Wsp";
import Redes from "../components/Redes";
import CarouselInfinite from "../components/Carousel";
import { EnvVarWarning } from "../components/env-var-warning";
import HeaderAuth from "../components/header-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import moto300 from "./../app/public/moto300X300.png"
import Image from "next/image";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import moto1 from "./public/moto1.jpg"
import moto2 from "./public/moto2.jpg"
import moto3 from "./public/moto3.jpg"
import redes from "./public/redes.png"
import tickets from "./public/tickets.png"
import bolsa from "./public/bolsa.png"
import { Play } from "lucide-react";
import adorno from "./public/adorno.svg"



export default async function Home() {
  
        
  
      
  return (
    <>
      <nav className="w-full bg-background flex justify-center border-b border-b-foreground/10 h-18 relative  shadow-xl"  style={{"boxShadow": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"}}>
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="flex gap-5 items-center font-semibold">
                <Link href={"/"} className="text-primary font-bold text-lg md:text-2xl">UNEXPO RIFA</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
      </nav>
      <main className="flex flex-col w-full items-center w-full relative h-fit">
        <Image src={adorno} alt="adorno" width={200} height={400} className="z-0 w-[40vw] h-[80vh] absolute top-[110vh] -left-[20vw] opacity-30 "/>
        <Hero />
        <section className="flex-1 flex w-full h-fit items-center justify-center flex-col gap-8  md:p-10">
          <div className="w-full h-fit mt-[12vh] flex flex-col gap-6 items-center relative z-10">
            <h2 className="w-fit h-fit text-3xl font-bold text-foreground text-center">GANA ALGUNO DE LOS SIGUIENTES 7 PREMIOS </h2>
          
            <Card className="w-[90%] md:w-[600px]">
              <CardHeader>
                 </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center justify-center">
              
              <Carousel className="w-full max-w-xs">
                  <CarouselContent className="">
                    {[{img:moto300,title:"PRIMER LUGAR",premio:"MOTO RK200",info:"El primer premio se determinara por los números que salgan en la lotería del Kino Táchira Super Gana, a las 10pm."}, 
                    {img:bolsa,title:"SEGUNDO LUGAR",premio:"300$",info:"El segundo premio se determinara por los números que salgan en la lotería del Kino Táchira Super Gana, a las 7pm."},
                    {img:bolsa,title:"NÚMERO 7777",premio:"100$",info:"Si te sale el número 7777 al momento de tu compra, Ganaras de forma inmediata un premio de 100$ y podrás seguir participando por los demás premios."},
                    {img:bolsa,title:"NÚMERO 3333",premio:"100$",info:"Si te sale el número 3333 al momento de tu compra, Ganaras de forma inmediata un premio de 100$ y podrás seguir participando por los demás premios."},
                    {img:bolsa,title:"NÚMERO 8888",premio:"100$",info:"Si te sale el número 8888 al momento de tu compra, Ganaras de forma inmediata un premio de 100$ y podrás seguir participando por los demás premios."},
                    {img:tickets,title:"MAYOR CANTIDAD DE TICKETS",premio:"250$",info:"La persona con más tickets comprados obtendrá un premio de $250."},
                    {img:redes,title:"COMPARTE Y GANA",premio:"50$",info:" ¡Estarás participando por $50! Mientras más compartas, ¡más oportunidades tendrás de ganar!."}
                    ].map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card className="">
                          <CardHeader>
                              <CardTitle className="text-2xl font-bold text-center">{item?.title}</CardTitle>
                              <span className="text-foreground text-md  opacity-80 text-center">{item?.info}</span>
                            </CardHeader>
                            <CardContent className="flex  items-center justify-center p-6">
                              <div className="flex flex-col items-center justify-center gap-4 rounded-lg  min-w-[250px] min-h-[250px] md:min-w-[300px] md:min-h-[300px] shadow-xl border-gray-100/40 p-4">
                                <span className="animate-pulse text-4xl font-bold text-foreground text-center">{item?.premio}</span>
                                <div key={index} className='relative w-[200px] h-[200px]  '>
                                {item?.img && <Image alt='moto primer premio' width={300} height={300} src={item.img} className='w-full h-full'/>}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                            
              </CardContent>
              <CardFooter className="flex justify-between">
                <div/>
                <Link href={"/sign-up"} className="bg-primary text-white font-bold hover:scale-105 rounded-lg w-fit h-fit px-4 py-2">PARTICIPA YA</Link>
              </CardFooter>
            </Card>

          
            
          </div>
          <div className="rounded-3xl flex flex-col gap-8 w-full h-fit  py-10 p-4 bg-primary items-center justify-items-center">
          <h3 className="text-white text-4xl font-bold text-center animate-pulse">¡2 TICKETS X 1$! 👀</h3>
          
          <span className="text-xl  text-center text-primary-foreground ">¡Podrás ser el ganador de cualquiera de esos GRANDIOSOS PREMIOS🎁!</span>
          
          <Link href={"/sign-up"} className="text-foreground bg-background w-fit h-fit py-2 px-4 font-bold rounded-lg hover:scale-105 "> PARTICIPA YA</Link>
          </div>

          
          <div className="flex flex-col gap-4  mt-16 w-full h-fit items-center justify-center relative ">
             <h2 className="w-fit h-fit text-3xl font-bold text-primary text-center">DETALLES DEL PRIMER PREMIO</h2>
             <Card className="w-[90%] md:w-[600px]">
              <CardHeader>
                <CardTitle className="flex flex-col gap-2">PRIMER PREMIO <span className="animate-pulse text-3xl">MOTO RK200</span></CardTitle>
                <CardDescription>No esperes más, participa y gana una maravillosa moto RK200</CardDescription>
              
              
              </CardHeader>
              <CardContent className="flex flex-col gap-4 items-center justify-center">
              
              <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {[ "1", "2","3","modal",].map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              {item =="modal"?<Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" className="flex flex-col gap-2 w-full h-full p-2"><span className="text-xl font-bold">Ver video</span><Play className="w-20 h-20" /></Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>Moto RK200</DialogTitle>
                                        </DialogHeader>
                                        <video className="w-full h-full max-h-[450px]" controls preload="none">
                                            <source  src="https://ik.imagekit.io/rifaapp/videomoto.mp4?updatedAt=1740261254436" type="video/mp4" />
                                            <track
                                              src="https://ik.imagekit.io/rifaapp/videomoto.mp4?updatedAt=1740261254436"
                                              kind="subtitles"

                                              srcLang="es"
                                              label="English"
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                        <DialogFooter>
                                          <DialogClose className="w-fit h-fit p-2 px-4 rounded-lg text-white bg-primary">Cerrar</DialogClose>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                            :<Image alt="foto de la moto" width={300} height={300} src={item=="1"?moto1:item=="2"?moto2:moto3}></Image>}
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                            
              </CardContent>
              <CardFooter className="flex justify-between">
                <div/>
                <Link href={"/sign-up"} className="bg-primary text-white font-bold hover:scale-105 rounded-lg w-fit h-fit px-4 py-2">PARTICIPA YA</Link>
            
              </CardFooter>
            </Card>
          </div>
      
          <div className="rounded-3xl flex flex-col gap-8 w-full h-fit  py-10 p-4 bg-primary items-center justify-items-center">
          <h3 className="text-white text-3xl font-bold text-center">¡SE ACABA EL TIEMPO!</h3>
          
          <span className="text-xl opacity-70 text-center text-primary-foreground ">La rifa se llevara acabo con la Lotería del kino Táchira Super Gana, si deseas participar, registrate antes de que se acabe el tiempo. Podrás mantenerte informado en tiempo real del estado de la rifa a través de tu cuenta o nuestras redes sociales.</span>
          
          <Link href={"/sign-up"} className="text-foreground bg-background w-fit h-fit py-2 px-4 font-bold rounded-lg hover:scale-105 "> PARTICIPA YA</Link>
          </div>

          <div className="relative rounded-3xl flex flex-col gap-8 justify-center items-center gap-4 w-full h-fit py-6 items-center justify-items-center">
          <h3 className="text-primary text-3xl font-bold text-center">CONTACTANOS EN NUESTRAS REDES SOCIALES</h3>
          <Redes/>
          </div>
          <Link href={"https://api.whatsapp.com/send?phone=584128220099&text=Hola, quiero obtener mas información de la gran rifa"} target={"_blank"} className="fixed bottom-4 right-4 md:right-2 md:bottom-2 md:w-[120px] md:h-[120px] h-20 w-20 z-20  ">

                  <Wsp className="w-full  h-full hover:scale-105 cursor-pointer transition-all duration-600 " style={{filter:"drop-shadow(0 10px 15px black)"}}/>
          </Link>
        </section>
      </main>
    </>
  );
}
