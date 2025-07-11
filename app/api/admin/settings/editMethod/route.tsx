
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../../../utils/supabase/server';

export async function POST( request:NextRequest) {

const supabase = await createClient();
const {id,name, info,currency} = await request.json()
  console.log(id,name,info)
        const { data, error } = await supabase
        .from('method')
        .update({ name,info,currency})
        .eq('id', id)
        .select()
        
        if(error){
            return NextResponse.json({msj:"Error Al actualizar " },{status:500})
        }
  
  return NextResponse.json({msj:"Actualizado con exito" },{status:200})
  
}
