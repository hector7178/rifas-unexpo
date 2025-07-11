"use client"

import React, { useState } from 'react';
import { SubmitButton } from '../submit-button';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface IFormInput {
   email:string;
   password:string;
   terms:boolean
}

const schema = yup.object().shape({
  email: yup.string().required("email completo es requerido"),
  password:yup.string().min( 6,"Minimo 6 caracteres").required("Contraseña es requerida"),
  terms:yup.boolean().required("Se tiene que aceptar los terminos y condiciones")
});
 const RegisterPay = ({searchParams}:{searchParams:any}) => {
    const[error,setErrorMsj]=useState<string>("")
    const router = useRouter()
     const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        formState: { errors },
      } = useForm<IFormInput>({ resolver: yupResolver(schema) });

      const onSubmit = async (data: IFormInput) => {
    
        if(!data.terms){
          setError("terms",{message:"Tienes que aceptar los terminos y condiciones"})
        }
    
        const nextstep=await fetch("/api/buy/step2",{
          body:JSON.stringify({...data,
            monto:searchParams?.monto,
            number:searchParams.number,
            method: searchParams?.method,
            name:searchParams?.name,
            cedula:searchParams?.cedula,
            phone:searchParams?.phone,
            transfer:searchParams?.nt,
            img:searchParams?.img,
            email:data.email,
            password:data.password

          }),
          method:"POST"})
          const res= await nextstep?.json()
          if(nextstep.status !== 200) {
            console.log(res.msj)
            setErrorMsj(res.msj =="User already registered"?"Cuenta ya existe, intente agregar otro correo":"Ha ocurrido un error, intente de nuevo")
            return toast.error("Ha ocurrido un error en la solicitud, intente nuevamente!.")
        }
         
          toast.success("Registro exitoso, pronto sera redireccionado!.")
          setTimeout(()=>{
            router.push("/protected/dashboard/users")
          },1500)
            
          
      };

    return (
        <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-4 items-center justify-center'>
          {error!== "" ? <span className='text-red-600 text-md'>{error}</span>:null}

          <span className='text-md text-foreground font-bold text-center'>Agrega un correo y contraseña e inicia sesión para ver los números que le tocaron en la sección de tickets 👀</span>
        <div className='flex flex-col gap-2 w-full md:w-3/4'>
         <span className='text-red-600 text-xs '>{errors.email?.message}</span>
            <Label htmlFor="email">Correo</Label>
            <Input   {...register("email")} type='text' placeholder="you@example.com"  />
        </div> 
        <div className='flex flex-col gap-2 w-full md:w-3/4'>
           <span className='text-red-600 text-xs '>{errors.password?.message}</span>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
           {...register("password")}
            placeholder="tu contraseña"
            minLength={6}
            required
          />
          </div>
          <div className="flex flex-col items-center space-x-2 w-full md:w-3/4">
                <span className='text-red-600 text-xs '>{errors.terms?.message}</span>
                <div className='flex flex-row gap-2'>
                <Checkbox id="terms" name="terms" onCheckedChange={(e)=>setValue("terms",!!e)} />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Acepto los <Link className="hover:text-primary text-blue-700" href={"/tac"}>Términos y condiciones</Link>
                </label>
                </div>
             
            </div>
          
         
            <SubmitButton pendingText='Registrando...' type="submit" className="p-2 px-4 w-fit h-fit bg-primary text-primary-foreground font-bold rounded-lg hover:scale-105">
            Registrarte
            </SubmitButton>
            <Toaster position='top-right'/>
        </form>
    );
 }
 
 export default RegisterPay;
 