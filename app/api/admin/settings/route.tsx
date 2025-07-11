import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';

export async function GET( request:NextRequest) {
const supabase = await createClient();
  
  
    let { data: payments, error:errorPayments } = await supabase
    .from('settings')
    .select('*')

    if( errorPayments || !payments){
        const msj= errorPayments
        return NextResponse.json({msj:`error en la consulta${msj}`},{status:500})

    }
    for (let index = 0; index < payments[0]?.payment_method.length; index++) {
        let { data: method, error } = await supabase
        .from('method')
        .select("*")
        .eq('id',  payments[0]?.payment_method[index] );
        if(method) payments[0].payment_method[index] = method[0];
        
    }
        
    
            
     
  return NextResponse.json({ settings:payments})
}
