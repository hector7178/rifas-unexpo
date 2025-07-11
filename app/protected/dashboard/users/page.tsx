import { redirect } from 'next/navigation';
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import Image from 'next/image';
import moto1 from "../../../public/fotonueva.jpeg"
import AnimateButton from '../../../../components/Animate-button';

async function Page() {
    const supabase = await createClient();
    
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
  let { data: profile, error } = await supabase
  .from('profile')
  .select("*")
  .eq('user_id', user?.id)

 

  
let { data: paymentsData, error:errorPayments} = await supabase
.from('payments')
.select("*")
.eq('user', user?.id)

let porValidar=0;
let validados=0;

if(!paymentsData){
  return redirect("/protected/dashboard/users/buy")
 }    
for (let index = 0; index < paymentsData?.length; index++) {
  const element:any = paymentsData[index];

  if(!element.status){
    porValidar += element?.numbers?.length

  }else{
    validados += element?.numbers?.length
  }
  
}

        
 
  
  return (
    <section className='flex flex-col gap-6 w-full items-center '>
      <div className='flex items-star justify- w-full'>
      <h1 className='px-28  font-bold text-4xl text bg-background-primary w-fit text-start'>Inicio</h1>
      </div>
       
        <div className='flex flex-col md:flex-row gap-4 w-full items-center justify-center '>
        <Card className="w-full md:basis-1/4 bg-background">
          <CardHeader>
            <CardTitle>Tickets comprados</CardTitle>
            <CardDescription>Numero de tickets comprados</CardDescription>
          </CardHeader>
          <CardContent>
            <span className='text-3xl font-bold text-primary '>{profile && profile[0]?.ntickets?.length}</span>
          </CardContent>
         
        </Card>
        <Card className="w-full md:basis-1/4 bg-background">
          <CardHeader>
            <CardTitle>Tickets Verificados</CardTitle>
            <CardDescription>Tickets validados</CardDescription>
          </CardHeader>
          <CardContent>
          <span className='text-3xl font-bold text-primary '>{validados}</span>
         
          </CardContent>
          
        </Card>
        <Card className="w-full md:basis-1/4 bg-background">
          <CardHeader>
            <CardTitle>Tickets sin validar</CardTitle>
            <CardDescription>En espera de ser validados </CardDescription>
          </CardHeader>
          <CardContent>
          <span className='text-3xl font-bold text-primary '>{porValidar}</span>
          </CardContent>
        </Card>
        </div>
        <div className='relative flex flex-col p-4  gap-4 md:w-3/4  w-full bg-neutral-100 rounded-lg items-start justify-center px-8 p-4'>
          
            <Link href={"/protected/dashboard/users/tickets?page=0"} className='absolute top-6 right-2 md:right-10 p-2 w-fit h-fit rounded-lg text-md bg-primary text-white font-bold'>Ver Tickets</Link>
          
          <div className='flex flex-col md:flex-row gap-4 items-start justify-start'>
            <Image src={moto1} width={200} height={200} alt='moto' className='basis-1/4 rounded-lg '/>
            <div className='flex flex-col gap-4 items-start justify-start'>
              <h2 className='text-primary text-3xl font-bold'>MOTO RK200</h2>
              <p className='w-3/4 text-primary font-bold'>¡Podrás ser el ganador de cualquiera de los 7 GRANDIOSOS PREMIOS🎁! </p>
              <AnimateButton ruta={"/protected/dashboard/users/buy"} />
            </div>
          </div>
        
        </div>

    </section>
  )
}

export default Page