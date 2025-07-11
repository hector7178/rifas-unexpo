
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../../../utils/supabase/server';

export async function POST( request:NextRequest) {
const supabase = await createClient();
const {name, info,id,currency} = await request.json()
  
    const { data, error } = await supabase
    .from('method')
    .insert([
    { name, info, currency },
    ])
    .select()

    
    let { data: Allsettings, error:SError } = await supabase
    .from('settings')
    .select("*")
    .eq('id', id)

    if(!Allsettings|| !data){
        return NextResponse.json({msj:"configuracion no encontrada " },{status:500})
    }
        
    const { data:setting, error:errorSetting } = await supabase
    .from('settings')
    .update({ payment_method: [...Allsettings[0].payment_method, data[0].id] })
    .eq('id', id)
    .select()
        

    if(error){
        return NextResponse.json({msj:"Error Al actualizar " },{status:500})
    }
        
  return NextResponse.json({msj:"Creado con exito" },{status:200})
}
