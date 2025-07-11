import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'
export const dynamic = 'force-dynamic';
async function Page() {
const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
let { data: profile, error } = await supabase
.from('profile')
.select("*")
.eq('user_id', user?.id)
if(!profile){
  return redirect("/protected/dashboard/users")
}

  return (
    <section className='flex flex-col gap-6 items-start justify-start w-full pl-28'>
      <h4 className='text-3xl font-bold text-foreground'>Perfil</h4>
       <div className='flex flex-col gap-2'>
        <h4 className='text-xl font-bold'>Nombre completo: </h4>
      <span>{profile[0]?.name}</span> 
      </div>
      <div className='flex flex-col gap-2'>
        <h4 className='text-xl font-bold'>Cédula: </h4>
      <span>{profile[0]?.cedula}</span> 
      </div>
      <div className='flex flex-col gap-2'>
        <h4 className='text-xl font-bold'>Teléfono: </h4>
        <span>{profile[0]?.phone}</span> 
      </div>
      <div className='flex flex-col gap-2'>
        <h4 className='text-xl font-bold'>Estado: </h4>
        <span>{profile[0]?.ntickets?.length >0 ?"Participando":"No participando"}</span> 
      </div>
    </section>
  )
}

export default Page