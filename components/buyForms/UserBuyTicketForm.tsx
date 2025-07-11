"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from 'next/navigation';
import { Clipboard } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { SubmitButton } from '../submit-button';
interface IFormInput {
  name: string;
  phone: number;
  cedula:number;
  transfer:number;
  number:number;
  method:string;
  monto?:number;
  terms:boolean;
}

const UserBuyTicketsForm= ({searchParams,methods,userData,n}:{n:any,searchParams:any,methods:any,userData:any}) => {
  
  const schema = yup.object().shape({
    name: yup.string().required("Nombre completo es requerido"),
    cedula:yup.number().required("Cédula es requerida").typeError('Debe ser un número'),
    phone: yup
      .number()
      .typeError('Debe ser un número')
      .min(4,"Número no valido")
      .required("Número de teléfono es requerido"),
    transfer:yup.number().typeError('Debe ser un número').min(4,"Número no valido").required("Número de transferencia es requerido"),
    number:yup.number().typeError('Debe ser un número').min((n??2),`El número de tickets tiene que ser igual o mayor a ${n??2}`).required("Número de tickets es requerido"),
    method:yup.string().required("Método es requerido"),
    monto:yup.number(),
    terms: yup.boolean().required("Los términos y condiciones son requeridos")
  });
  
  const router = useRouter()

  const [file,setFile]=useState<File>()
  const [sender,setsender]=useState<boolean>(false)
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) ,defaultValues:{
    name:userData?.name,
    phone:userData?.phone,
    cedula:userData?.cedula,
    monto:searchParams?.monto,
    method:searchParams?.method,
    number:searchParams?.number
  }});

  const onSubmit = async (data: IFormInput) => {
    setsender(e=>e=true)
    
    if(!data.terms){
      setError("terms",{message:"Tienes que aceptar los terminos y condiciones"})
    }
    const form = new FormData();
    form.append('monto', searchParams?.monto?.toString());
    form.append('user', userData?.user_id.toString());
    form.append('number', data.number!.toString());
    form.append('method', data.method!.toString());
    form.append('name', userData?.name.toString());
    form.append('cedula',userData?.cedula.toString()); 
    form.append('phone', userData?.phone!.toString());
    form.append('transfer', data.transfer!.toString());
    form.append('file', file!);
    form.append('terms', data.terms!.toString());
 

    const nextstep=await fetch("/api/buy/users",{
      body:form,
      method:"POST"})
      const res= await nextstep.json()
      if(nextstep.status !== 200){ 
        setsender(e=>e=false)
        return  toast.error(res.msj??"Error, intente de nuevo")
      
      }
      
      toast.success("Se han cargado sus datos, pronto será redireccionado para coontinuar con el proceso!.")
      setTimeout(()=>{
        setsender(e=>e=false)
        router.push(`/sign-up?number=${encodeURIComponent(data.number!)}&nt=${data.transfer!}&method=${encodeURIComponent(data.method!)}&monto=${searchParams?.monto}&img=${res?.img}&phone=${getValues("phone")}&cedula=${data.cedula!}&name=${data.name!}&step=register`)
      },2000)
      
     
  };

  const seeMonto=async ()=>{
    if(Number(getValues("number"))<2){
        return setError("number",{message:`Número tiene que ser mayor que ${n??2}`})
    }
    if(!getValues("method")){
        return setError("method",{message:"Metodo de pago es requerido!"})

    }
    clearErrors()
    

    const res= await fetch(`/api/buy/monto?number=${encodeURIComponent(getValues("number"))}&method=${encodeURIComponent(getValues("method"))}`,{method:"GET"})
    if(res.status !== 200){
        toast.error("Error al obtener monto total, intente de nuevo!.",{duration:1000})
    }
    const monto = await res.json()
    router.push(`/protected/dashboard/users/buy?monto=${encodeURIComponent(monto?.monto)}&number=${encodeURIComponent(getValues("number"))}&method=${encodeURIComponent(getValues("method"))}`)
  }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-center justify-center">
         
          <div className="flex flex-col gap-2 items-center justify-center w-full h-fit">
              <span className='text-xs text-red-600 '>{errors?.number?.message}</span>
              <label className="text-md text-foreground font-bold flex flex-col">Agregar cantidad de tickets a comprar<span className="text-xs text-foreground/60"> (tiene que ser mayor a {n??2} tickets)</span></label>
              <div className="flex flex-row gap-2 items-center justify-center">
                  <input type="number" {...register("number")} className={`border-2 border-primary/40 bg-transparent rounded-lg text-md p-2 w-[300px]`}/>
              </div>
              
            </div>
          <div className="flex items-center justify-center flex-col gap-2 w-[300px] ">
          <span className='text-xs text-red-600 '>{errors?.method?.message}</span>
              
          <Label htmlFor="method" className="text-md font-bold">Metodo de pago</Label>
          <Select defaultValue={searchParams?.method} onValueChange={(e)=>{
             setValue("method",e)
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="seleccionar metodo de pago" />
            </SelectTrigger>
            <SelectContent>
              {methods?.map((item:any,index:any)=>{
                return(<SelectItem key={index} value={item?.name}>{item?.name}</SelectItem>)
              })}
            </SelectContent>
          </Select>
          </div>
          
          {searchParams?.monto? 
          null
          :<button type='button' onClick={()=>seeMonto()} className="p-2 px-4 w-fit h-fit bg-primary text-primary-foreground font-bold rounded-lg hover:scale-105">
          Ver datos de pago
          </button>}
          {  searchParams?.monto?
          <div className="flex flex-col items-start border-2 border-primary/40 p-2 w-fit h-fit rounded-lg ">
             <h3 className="text-xl font-bold text-foreground">Total a pagar: {searchParams?.monto} {methods?.find((i:any)=>i.name == searchParams?.method)?.currency}</h3>
            <div className="flex flex-col">
              <span className="text-md font-bold">{searchParams?.method}</span>
              <div className="w-[300px] flex flex-col">{methods?.find((i:any)=>i.name == searchParams?.method)?.info?.split("/").map((item:any,i:number)=>{
                return( <span className=" flex flex-row items-center gap-2" key={i}>
                 
                  {item}  <Clipboard className='w-8 h-8 p-2 rounded bg-primary text-white' onClick={async ()=>{
                    
                      await navigator.clipboard.writeText(item.split(":")[1].trim());
                      alert('Text copied');
                  
                  }}/>
                  
                  </span>)
              })}
              </div> 
            </div>
          </div>
          :null}

          {searchParams?.monto? 
          <>
          <div className="flex flex-col gap-2 items-center justify-center w-full h-fit">
          <span className='text-xs text-red-600 '>{errors?.name?.message}</span>
              
              <label className="text-md text-foreground  font-bold flex flex-col">Ingresar Nombre completo</label>
              <div className="flex flex-row gap-2 items-center justify-center">
                  <input disabled  type="text"   {...register("name")} className={`opacity-60 cursor-not-allowed w-[300px] border-2 border-primary/40 bg-transparent rounded-lg text-md p-2 `} />
              </div>
              
            </div>

          <div className="flex flex-col gap-2 items-center justify-center w-full h-fit">
          <span className='text-xs text-red-600 '>{errors?.phone?.message}</span>
              
              <label className="text-md text-foreground font-bold flex flex-col">Ingresar número de Teléfono</label>
              <div className="flex flex-row gap-2 items-center justify-center">
                  <input  disabled type="number"  {...register("phone")} className={`opacity-60 w-[300px] border-2 border-primary/40 bg-transparent rounded-lg text-md p-2 cursor-not-allowed`}/>
              </div>
              
            </div>
            <div className="flex flex-col gap-2 items-center justify-center w-full h-fit">
            <span className='text-xs text-red-600 '>{errors?.cedula?.message}</span>
              
              <label className="text-md text-foreground font-bold flex flex-col">Ingresar número de Cédula</label>
              <div className="flex flex-row gap-2 items-center justify-center">
                  <input  disabled  type="number" {...register("cedula")} className={`opacity-60 cursor-not-allowed  w-[300px] border-2 border-primary/40 bg-transparent rounded-lg text-md p-2 `}/>
              </div>
              
            </div>
          
           <div className="flex flex-col gap-2 items-center justify-center w-full h-fit">
           <span className='text-xs text-red-600 '>{errors?.transfer?.message}</span>
              
              <label className="text-md text-foreground font-bold flex flex-col">Agregar el número de transferencia</label>
              <div className="flex flex-row gap-2 items-center justify-center">
                  <input defaultValue={""}  type="number" {...register("transfer")} className={`w-[300px] border-2 border-primary/40 bg-transparent rounded-lg text-md p-2 `}/>
              </div>
              
            </div>
            <div className="flex flex-col gap-2 items-center justify-center w-full h-fit">
              <label className="text-md text-foreground font-bold flex flex-col">Agregar el Capture de transferencia</label>
              <div className="flex flex-row gap-2 items-center justify-center">
                  <input type="file" onChange={(e)=>{
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }} className={`border-2 border-primary/40 bg-transparent rounded-lg text-md p-2 w-[300px] `} name="file" accept=".jpg,.png,.jpeg" placeholder=""/>
              </div>
              
            </div>
           
          
          </>
          :
          null
          }

        
       
        { searchParams.monto? 
        <>
        <div className="flex items-center space-x-2 flex-col">
        <span className='text-xs text-red-600 '>{errors?.terms?.message}</span>
          <div className='flex flex-row gap-2 '>
          <Checkbox id="terms" name="terms" onCheckedChange={(e)=>setValue("terms",!!e)}/>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
               Acepto los <Link className="hover:text-primary text-blue-700" href={"/tac"}>Términos y condiciones</Link>
              </label>
            </div>
            
          </div>   
        <SubmitButton pendingText='Comprando...' disabled={sender} type="submit" className="p-2 px-4 w-fit h-fit bg-primary text-primary-foreground font-bold rounded-lg hover:scale-105">
        Comprar
        </SubmitButton>
        
        </>
        
        :null}
       <Toaster position='top-right' />
       </form>
    );
}

export default UserBuyTicketsForm;
