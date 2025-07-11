
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../../../utils/supabase/server';

export async function POST( request:NextRequest) {
const supabase = await createClient();
const {id,date, price,dolar,ntickets} = await request.json()
  
        const { data, error } = await supabase
        .from('settings')
        .update({ date,price,dolar,ntickets })
        .eq('id', id)
        .select()

        if(error){
            return NextResponse.json({msj:"Error Al actualizar " },{status:500})
        }
  
  return NextResponse.json({msj:"Actualizado con exito" },{status:200})
}
