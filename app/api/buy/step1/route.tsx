import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import jwt from 'jsonwebtoken';

export async function POST( request:NextRequest) {
const bucketName = process.env.bucket_supabase || "rifas-cap-unexpo";
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
    if(!formData.get("file")){
     return NextResponse.json({msj:"Error archivos"},{status:500})
    }
    if(!formData.get("terms")){
      return NextResponse.json({msj:"Error Aceptar terminos"},{status:500})
    }
   const file= formData.get("file") as File;
   console.log('Archivo recibido:', file);

   const trans= formData.get("transfer") as string;

   const filePath= `rifas-capture-${trans}.${file.type.split('/')[1]}`;
    const { data, error:errorcap } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file)

    if (errorcap)  return NextResponse.json({msj:errorcap?.message},{status:500})

    console.log('Imagen subida:', data)

    // 4. Obtiene URL pública (requiere configurar políticas de acceso)
    const { data:datares} = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath )

    console.log('URL pública:', datares)
      return NextResponse.json({msj:"Exito, seguir con el registro", img:datares},{status:200})
    
} catch (error) {
    return NextResponse.json({msj:"Error servidor"},{status:500});
}
}

