import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '../../../../../utils/supabase/server';

export async function POST( request:NextRequest) {
const supabase = await createClient();
const {id} = await request.json()

    if(!id){
        return NextResponse.json({msj:`Faltan datos para completar la petición`},{status:500})

    }
  
    let { data:payments, error:errorPayments } = await supabase
    .from('payments')
    .update({ status: 'verificado' })
    .eq('id', id)
    .select()
    
    if(payments){
        for (let index = 0; index < payments[0].numbers.length; index++) {
            
            const { data, error } = await supabase
            .from('tickets')
            .update({ status: 'no disponible'})
            .eq('number', payments[0].numbers[index])
            .select()
        
            
        }
    }

    if(  errorPayments){
        const msj= errorPayments
        return NextResponse.json({msj:`error en la verificación${msj}`},{status:500})

    }
    
        
          

  return NextResponse.json({msj:"Verificado"})
}

