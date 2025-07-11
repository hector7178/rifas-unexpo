import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function POST( request:NextRequest) {
    try {
        const getNumbers= async (number:number,name:string)=>{
            const data= await fetch(`${process.env.URL}/api/numbers?count=${encodeURIComponent(number)}&name=${encodeURIComponent(name)}`,{method:"GET"})
            const datares= await data?.json()
            const numbers= datares?.numbers.map((item:any)=>`${item.number}` )
          console.log(numbers)
            return numbers

        }
        const supabase = await createClient();
        const {monto,
        number,
        method,
        name,
        cedula,
        phone,
        transfer,
        email,
        password,
        img} =await  request.json()
        
          const origin = (await headers()).get("origin");
        
          if (!email || !password) {
            return NextResponse.json({msj:"Usuario o contraseña no validas"},{status:500})
          }
          const numbersRifa= await getNumbers(Number(number),name)
          if(!(numbersRifa.length>=number)){
            return NextResponse.json({msj:"Error al asignar números, intente de nuevo"},{status:500})
          }

          const { data,error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${origin}/auth/callback`,
            },
          });
          
        
          if (error) {
            console.error(error.code + " " + error.message);
            return NextResponse.json({msj:error.message},{status:500})
          } else {
            
              const {  error } = await supabase
              .from('profile')
              .insert([
                { user_id:data.user?.id,rol:"user",name,phone,ntickets:numbersRifa, address:"",cedula:cedula },
              ])
              .select()
        
              const { data:payment, error:errorpayments } = await supabase
              .from('payments')
              .insert([
                { user: data.user?.id, numbers:numbersRifa, capture:img, trans_number:transfer, pay_method:method,status:false,monto:monto },
              ])
              .select()
        
              if (error ) {
                console.error(error.code + " " + error.message);
                return NextResponse.json({msj:"Error de servidor"},{status:500})
              }
              if(errorpayments ){
                return NextResponse.json({msj:"Error de servidor"},{status:500})
              }
              if (payment){
                for (let index = 0; index < payment[0].numbers.length; index++) {
                  const element = payment[0].numbers[index];
                  const { data:tickets, error } = await supabase
                  .from('tickets')
                  .update({ "status": 'no disponible'})
                  .eq('number', element)
                  .select()

                  const { data:ticketsPAy, error:tPay } = await supabase
                  .from('tickets')
                  .update({ "payid": payment[0].id})
                  .eq('number', element)
                  .select()
                  if(error)return NextResponse.json({msj:"Error tickets"},{status:500})
                  
                }
               } 
        
              const { error:errorsignin } = await supabase.auth.signInWithPassword({
                  email,
                  password,
              });
            return NextResponse.json({msj:"Registro exitoso"},{status:200})
          }
    } catch (error) {
      console.log(error)

        return NextResponse.json({msj:"Error intente de nuevo"},{status:500})
    }
   

}

