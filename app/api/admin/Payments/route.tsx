import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';

export async function GET( request:NextRequest) {
const supabase = await createClient();
  
  
    let { data: payments, error:errorPayments } = await supabase
    .from('payments')
    .select('*')
    .order('id', { ascending: false });

    if( errorPayments){
        const msj= errorPayments
        return NextResponse.json({msj:`error en la consulta${msj}`},{status:500})

    }
     
  return NextResponse.json({ payments:payments})
}
