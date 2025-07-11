import React from 'react'
import { Input } from '../../../../../components/ui/input'
import { Label } from '../../../../../components/ui/label'
import { Button } from '../../../../../components/ui/button'
import { Textarea } from '../../../../../components/ui/textarea'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../../../components/ui/dialog'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic';

async function Page() {
  const getData = await fetch(`${process.env.URL}/api/admin/settings`,{method:"GET"})
  let data = await  getData.json()
 
  async function update(e:FormData){
    "use server";
    const getres = await fetch(`${process.env.URL}/api/admin/settings/edit`,{
      method:"POST",
      body:JSON.stringify({id:data?.settings[0]?.id, price:e.get("price"),date:e.get("fecha"), dolar:e.get("dolar"),ntickets:e.get("ntickets")})})
      let res= await  getres.json()

      if(getres.status!=200){
        redirect(`/protected/dashboard/admin/config?msj=${res.msj}`)
      }
      
      revalidatePath("/protected/dashboard/admin/config")

  }
  async function update2(e:FormData){
    "use server";
    const getres = await fetch(`${process.env.URL}/api/admin/settings/newMethod`,{
      method:"POST",
      body:JSON.stringify({id:data?.settings[0]?.id, name:e.get("name"),infodate:e.get("info"),currency:e.get("currency")})})
      let res= await  getres.json()

      if(getres.status!=200){
        redirect(`/protected/dashboard/admin/config?msj=${res.msj}`)
      }
      
      revalidatePath("/protected/dashboard/admin/config")

  }
  async function update3(e:FormData){
    "use server";
    const getres = await fetch(`${process.env.URL}/api/admin/settings/editMethod`,{
      method:"POST",
      body:JSON.stringify({id:e.get("id"), name:e.get("name"),currency:e.get("currency"),info:e.get("info")})})
      let res= await  getres.json()

      if(getres.status!=200){
        redirect(`/protected/dashboard/admin/config?msj=${res.msj}`)
      }
      
      revalidatePath("/protected/dashboard/admin/config")

  }

  async function update4(e:boolean){
    "use server";
      const supabase = await createClient();
      const { data, error } = await supabase
      .from('settings')
      .update({ d_paralelo:e})
      .eq('id', 1)
      .select()
      
      revalidatePath("/protected/dashboard/admin/config")

  }
  return (
    <section className='flex flex-col p-10 items-start justify-end w-full gap-4 '>
      
      <h2 className='text-4xl text-primary font-bold w-fit'>Configuración</h2>

      <form action={update} className='flex flex-col gap-2 md:w-3/4 lg:w-1/2 w-full '>
        <div className='flex flex-col gap-2 p-4 '>
          <Label>Fecha de la rifa</Label>
          <Input name='fecha' type='date' defaultValue={data?.settings[0]?.date}/>
        </div>
        <div className='flex flex-col gap-2 p-4'>
          <Label>Utilizar dolar paralelo</Label>
          <Switch name='d_paralelo' onCheckedChange={update4} checked={data?.settings[0]?.d_paralelo}/>
        </div>
        <div className='flex flex-col gap-2 p-4 '>
          <Label>Tasa de cambio $</Label>
          <Input name='dolar' type='number' disabled={data?.settings[0]?.d_paralelo} step={"any"} defaultValue={data?.settings[0]?.dolar}/>
        </div>
        <div className='flex flex-col gap-2 p-4 '>
          <Label>Número de compra minima en dolares</Label>
          <Input name='ntickets' type='number'  defaultValue={data?.settings[0]?.ntickets}/>
        </div>
        
        <div className='flex flex-col gap-2 p-4'>
          <Label>Precio por tickets en $</Label>
          <Input name='price'  defaultValue={data?.settings[0]?.price}/>
        </div>
        <Button type='submit' className='text-white bg-primary font-bold text-lg rounded-lg w-fit h-fit p-2 '> Guardar cambios</Button>
      </form>

      <div className='text-primary font-bold text-xl'><span>Metodos de pago</span> <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar metodo de pago </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar metodo de pago</DialogTitle>
          
        </DialogHeader>
        <form id="2" action={update2} className="flex flex-col gap-2 h-fit p-4">
          <div className="flex flex-col  gap-4">
            <Label htmlFor="name" className="text-left text-lg font-bold">
              Nombre del metodo de pago
            </Label>
            <Input name="name"  className="w-full" />
          </div>
          <div className="flex flex-col  gap-4">
            <Label htmlFor="currency" className="text-left text-lg font-bold">
              Moneda
            </Label>
            <Input name="currency"  className="w-full" />
          </div>
          <div className="flex flex-col  gap-4">
            <Label htmlFor="info" className="text-left text-lg font-bold">
              Información
            </Label>
           <Textarea name='info' className='w-full'/>
          </div>
        </form>
        <DialogFooter>
          <DialogClose type="submit" form="2" >
          Guardar
          </DialogClose>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
      <section className='flex flex-col md:flex-row gap-2'>
        {data?.settings[0]?.payment_method?.map((item:any ,index:number)=>{
          return <form className='border-2 border-primary/30 p-4 rounded-lg flex flex-col gap-2 ' action={update3} key={index}>
              
              <Input name="id" defaultValue={item.id} className='absolute -left-full hidden'/>
              <div className='flex flex-col gap-2'>
                <Label>Nombre</Label>
                <Input name="name" defaultValue={item?.name}/>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Moneda</Label>
                <Input name="currency" defaultValue={item?.currency}/>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Información</Label>
                <Textarea className='h-[120px]' name="info" defaultValue={item?.info}/>
              </div>
              <Button className='text-white bg-primary rounded-lg p-2 px-4 w-fit h-fi'>Editar</Button>
          </form>
        })}

      </section>
    </section>
  )
}

export default Page