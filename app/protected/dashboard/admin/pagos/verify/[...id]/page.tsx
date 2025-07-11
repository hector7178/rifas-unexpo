import { CancelarPago, validarPago } from '@/app/actions';
import ButtonCopy from '@/components/ButtonCopy';
import ModalContact from '@/components/ModalContact';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { createClient } from '@/utils/supabase/server';
import { Clipboard } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import React from 'react'
export const dynamic = 'force-dynamic';
async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[]  }>;

}) {

  const Params= await params
  const supabase = await createClient();
  let { data: payments, error:errorPayments } = await supabase
    .from('payments')
    .select('*')
    .eq("id", Params.id)
    if(!payments){
      redirect("/protected/dashboard/admin/pagos?error=pago no encontrado!")
    }

    let { data: profile, error:errorprofile } = await supabase
    .from('profile')
    .select('*')
    .eq("user_id", payments[0].user)

    if(!profile){
      redirect("/protected/dashboard/admin/pagos?error=Error al encontrar usuario, intentar de nuevo!")
    }
  return (
    <section className='flex flex-col px-10 md:px-28 gap-4 items-start justify-start w-full'>
      <h1 className='text-4xl text-primary font-bold flex flex-row gap-4 items-center'>Pago  <span className={`${payments[0].status?"text-green-600":"text-red-600"} text-lg`}>{payments[0].status?"(Pago validado)":"(Pago no validado)"}</span></h1>

      <div className='flex flex-col gap-2 border-2 border-b-primary/40 rounded-lg border-transparent w-full md:w-3/4 lg:w-1/2 pb-4'>
        <h3 className='text-xl font-bold text-foreground'>Nombre del comprador:</h3>
        <span>{profile[0].name}</span>
      </div>
      <div className='flex flex-col gap-2 border-2 border-b-primary/40 rounded-lg border-transparent w-full md:w-3/4 lg:w-1/2 pb-4'>
        <h3 className='text-xl font-bold text-foreground'>Monto:</h3>
        <span>{payments[0].monto}Bs</span>
      </div>
      <div className='flex flex-col gap-2 w-full border-2 border-b-primary/40 rounded-lg border-transparent w-full md:w-3/4 lg:w-1/2 pb-4'>
        <h3 className='text-xl font-bold text-foreground flex flex-row gap-2 items-center '> 
          <ButtonCopy data={payments[0]?.numbers?.toString()}/>
          Numeros:</h3>
        <div className='flex flex-row flex-wrap w-full md:w-3/4 lg:w-1/2 gap-2'>
          {payments[0]?.numbers.map((n:any,i:number)=>{
          return(<div key={i} className=' basis-1/4'><div className='flex items-center justify-center w-[80px] h-fit p-2 rounded-lg bg-primary text-white font-bold'>{n.padStart(4, "0")}</div></div>)
          })}
        </div>
      </div>
      <div className='flex flex-col gap-2 border-2 border-b-primary/40 rounded-lg border-transparent w-full md:w-3/4 lg:w-1/2 pb-4'>
        <h3 className='text-xl font-bold text-foreground'>Numero de transferencia:</h3>
        <span>{payments[0].trans_number}</span>
      </div>
      <div className='flex flex-col gap-2 md:w-3/4 lg:w-1/2 w-full border-2 border-b-primary/40 rounded-lg border-transparent pb-4'>
      <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline" className='bg-primary text-white font-bold'>Ver capture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] items-center justify-center">
        <DialogHeader>
          <DialogTitle>Capture de transferencia</DialogTitle>
        </DialogHeader>
        <Image className='rounded-lg' width={400} height={600} src={ payments[0].capture} alt="capture"/>
        
        <DialogFooter>
          <DialogClose className='bg-primary text-white font-bold rounded-lg p-4 py-2'>Cerrar</DialogClose >
        </DialogFooter>
      </DialogContent>
      </Dialog>
      </div>
      <div className='flex flex-row gap-4 items-center  '>
          <span>Contactar con el comprador</span>
          <div className='w-fit h-fit'>
            <ModalContact phone={profile[0].phone}/>
          </div>
        
      </div>
      
      <div className='relative flex flex-row gap-4 '>
            <form action={validarPago} className='flex flex-col gap-2'>
              <input type='text' name="id"  className='opacity-0' defaultValue={Params.id}/>
              <SubmitButton disabled={payments[0].status} pendingText='Validando...' >Validar pago</SubmitButton>
            </form>
            <form action={CancelarPago} className='flex flex-col gap-2'>
              <input type='text' name="id" className='opacity-0' defaultValue={Params.id}/>
              <SubmitButton  pendingText='Cancelando...' className='bg-red-500 text-white font-bold' >Cancelar pago</SubmitButton>
            </form>
      </div>
      
      
    </section>
  )
}

export default Page