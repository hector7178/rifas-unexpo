import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import jwt from 'jsonwebtoken';

export async function POST( request:NextRequest) {

try {
    
const formData = await request.formData();
const supabase = await createClient();
let { data: settings, error } = await supabase
.from('settings')
.select("*")
if(!settings) return NextResponse.json({msj:"Error servidor"},{status:500});

if(!(Number(formData.get("number"))>=settings[0].ntickets)){
      return NextResponse.json({msj:`Error número de tickets menor que ${settings[0].ntickets}`},{status:500})
    }
    if(!formData.get("transfer")){
      return NextResponse.json({msj:"Error numero de transferencia"},{status:500})
    }
    // if(!formData.get("file")){
    //  return NextResponse.json({msj:"Error archivos"},{status:500})
    // }
    if(!formData.get("terms")){
      return NextResponse.json({msj:"Error Aceptar terminos"},{status:500})
    }
   
    const url = 'https://upload.imagekit.io/api/v2/files/upload';
    const form = new FormData();
    form.append('file', formData.get("file")!);
    const filename= `capture${Math.round(Math.random()*1000000)}.jpg`;
  
  
    const token = jwt.sign({
      fileName: filename
    }, process.env.PRIVATE_KEY!, {
      expiresIn: 600,
      header: {
        alg: "HS256",
        typ: "JWT",
        kid: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
      },
    });
    form.append("fileName", filename);
    form.append('token', token);
    const options = {
      body:form,
      method: 'POST',
      headers: {Accept: 'application/json', Authorization: `Bearer ${process.env.PRIVATE_KEY}`}
    };
  
     
      const response = await fetch(url, options);
      const data = await response.json();
      if (!data) return NextResponse.json({msj:"Error servidor"},{status:500});
    
      return NextResponse.json({msj:"Exito, seguir con el registro", img:data.url},{status:200})
    
} catch (error) {
    return NextResponse.json({msj:"Error servidor"},{status:500});
}
}

