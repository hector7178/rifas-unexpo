import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';

export async function GET( request:NextRequest) {
const supabase = await createClient();
const searchParams = request.nextUrl.searchParams

let ticketsDisponibles:any[]=[];

let { data: profile, error } = await supabase
  .from('profile')
  .select('*')
          
for (let index = 0; index < 10; index++) {
  let { data: tickets, error:errortickets } = await supabase
  .from('tickets')
  .select("*")
  .range((index*1000),((index*1000)+1000))
  .eq('status', 'disponible')

  if(tickets)ticketsDisponibles=[ ...ticketsDisponibles, ...tickets];   
  
}
 

  const { count, error:errorcount } = await supabase
  .from('tickets')
  .select('*', { count: 'exact', head: true });
  
  
    let { data: payments, error:errorPayments } = await supabase
    .from('payments')
    .select('*')
    .range(0, 9)

    if( error || errorPayments){
        const msj= error ??  errorPayments
        return NextResponse.json({msj:`error en la consulta${msj}`},{status:500})

    }
        
          

  return NextResponse.json({users: profile?.length, tickets:count, payments, ticketsDisponibles:ticketsDisponibles.length},{status:200})
}

