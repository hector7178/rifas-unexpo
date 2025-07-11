
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';
const Page = async ({
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[]  }>;
  
  }) => {
    const Qparams= await searchParams
    const supabase = await createClient();
    let data=[];
    const buscarGanador=async (e:FormData)=>{
        "use server"
        revalidatePath(`/protected/dashboard/admin/ganador?number=${e.get("number")}`)
        redirect(`/protected/dashboard/admin/ganador?number=${e.get("number")}`)
    }
    if(Qparams?.number){
        
    let { data, error:errortickets } = await supabase
      .from('tickets')
      .select("*")
      .eq('number', Number(Qparams?.number))
    if(!data|| errortickets){
        redirect(`/protected/dashboard/admin/ganador?error=${encodeURI("Error número no encontrado")}`)
    }
      let { data: payments, error } = await supabase
      .from('payments')
      .select("*")
      .eq('id', data[0]?.payid)

    if(!payments||error){
        redirect(`/protected/dashboard/admin/ganador?error=${encodeURI("Error número no asignado o validado, intente de nuevo")}`)
    }
      let { data: profile, error:ErrProfile} = await supabase
      .from('profile')
      .select("*")
      .eq('user_id', payments[0]?.user)

    if(!profile||ErrProfile){
        redirect(`/protected/dashboard/admin/ganador?error=${encodeURI("Error perfil no encontrado")}`)
    }  
    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <div className='flex flex-col md:flex-row justify-between w-full'>
                <h1 className='text-xl md:text-4xl font-bold text-primary'>Buscar Ganador</h1>
                <form className='flex  md:flex-row gap-2 ' action={buscarGanador}>
                    <Input type='text' name='number' />
                    <SubmitButton pendingText='Consultando...' className='bg-primary p-2 rounded-lg w-fit h-fit'>Buscar</SubmitButton>
                </form>
            </div>
            <div className='w-full h-fit items-center justify-center flex '>
                {profile?.map((data,i)=>{
                    return (<section key={i} className='flex flex-col gap-4 rounded-lg w-fit h-fit p-4 border-2 border-primary/50'>
                        <h4 className='text-xl font-bold text-foreground'>FELICIDADES!!</h4>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl font-bold text-primary'>Nombre del ganador</span>
                            <span className='text-lg font-bold text-foreground'>{ data.name}</span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl font-bold text-primary'>Número de teléfono</span>
                            <span className='text-lg font-bold text-foreground'>{ data.phone}</span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl font-bold text-primary'>Cédula</span>
                            <span className='text-lg font-bold text-foreground'>{ data.cedula}</span>
                        </div>

                    </section>)
                })}
                
            </div>
            
        </div>
    );
    }

    return (
        <div className='flex flex-col w-full p-10 gap-6'>
            <div className='flex flex-col md:flex-row justify-between w-full'>
                <h1 className='text-xl md:text-4xl font-bold text-primary'>Buscar Ganador</h1>
                <form className='flex  md:flex-row gap-2 ' action={buscarGanador}>
                    <Input type='text' name='number' />
                    <SubmitButton pendingText='Consultando...' className='bg-primary p-2 rounded-lg w-fit h-fit'>Buscar</SubmitButton>
                </form>
            </div>
            <div className='w-full h-fit justify-center '>
               {Qparams?.error?
                <span className='p-2 rounded-lg w-fit h-fit bg-red-300 text-red-700 text-lg font-bold'>{Qparams?.error}</span>
                :null

               } 
                
            </div>
            
        </div>
    );
}

export default Page;
