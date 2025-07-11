import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();

  // Server Action to search user
  const buscarDataUsers = async (formData: FormData) => {
    'use server';
    const userQuery = formData.get('user') as string;
    const encodedUser = encodeURIComponent(userQuery);
    revalidatePath(`/protected/dashboard/admin/datausers?user=${encodedUser}`);
    redirect(`/protected/dashboard/admin/datausers?user=${encodedUser}`);
  };

  // Server Action to update user data
  const updateProfile = async (formData: FormData) => {
    'use server';
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const cedula = formData.get('cedula') as string;
    const id= formData.get('id') as string;

    const supabase = await createClient();

    const { error } = await supabase
      .from('profile')
      .update({ phone, cedula,name })
      .eq('id', id);
      const encodedUser = encodeURIComponent(name);
    if (error) {
      redirect(`/protected/dashboard/admin/datausers?error=${encodeURIComponent('Error updating user')}&user=${encodedUser}`);
    }
  
    revalidatePath(`/protected/dashboard/admin/datausers?user=${encodedUser}`);
    redirect(`/protected/dashboard/admin/datausers?user=${encodedUser}`);
  };

  if (resolvedSearchParams?.user) {
    const userName = decodeURIComponent(resolvedSearchParams.user as string);

    const { data: profile, error: ErrProfile } = await supabase
      .from('profile')
      .select('*')
      .eq('name', userName)
      .limit(1)
      .single(); // use single() if expecting one result

    if (ErrProfile || !profile) {
      redirect(`/protected/dashboard/admin/datausers?error=${encodeURIComponent('Perfil no encontrado')}`);
    }

    return (
      <div className='flex flex-col w-full p-10 gap-6'>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <h1 className='text-xl md:text-4xl font-bold text-primary'>Buscar datos del usuario</h1>
          <form className='flex md:flex-row gap-2' action={buscarDataUsers}>
            <Input type='text' name='user' defaultValue={userName} />
            <SubmitButton pendingText='Consultando...' className='bg-primary p-2 rounded-lg w-fit h-fit'>
              Buscar
            </SubmitButton>
          </form>
        </div>

        <div className='w-full h-fit items-center justify-center flex'>
          <form action={updateProfile} className='flex flex-col gap-4 rounded-lg w-fit h-fit p-4 border-2 border-primary/50'>
            <h4 className='text-xl font-bold text-foreground'>Datos del usuario</h4>
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-bold text-primary'>ID</span>
              <Input className='text-lg font-bold text-foreground' name='id'  defaultValue={profile.id} readOnly />
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-bold text-primary'>Nombre</span>
              <Input className='text-lg font-bold text-foreground' name='name' defaultValue={profile.name}  />
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-xl font-bold text-primary'>Número de teléfono</span>
              <Input className='text-lg font-bold text-foreground' name='phone' defaultValue={profile.phone} />
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-xl font-bold text-primary'>Cédula</span>
              <Input className='text-lg font-bold text-foreground' name='cedula' defaultValue={profile.cedula} />
            </div>

            <SubmitButton pendingText='Guardando...' type='submit' className='bg-primary p-2 rounded-lg w-fit h-fit'>
              Editar datos
            </SubmitButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full p-10 gap-6'>
      <div className='flex flex-col md:flex-row justify-between w-full'>
        <h1 className='text-xl md:text-4xl font-bold text-primary'>Buscar Usuario</h1>
        <form className='flex md:flex-row gap-2' action={buscarDataUsers}>
          <Input type='text' name='user' placeholder='Nombre del usuario' />
          <SubmitButton pendingText='Consultando...' className='bg-primary p-2 rounded-lg w-fit h-fit'>
            Buscar
          </SubmitButton>
        </form>
      </div>

      <div className='w-full h-fit justify-center'>
        {resolvedSearchParams?.error && (
          <span className='p-2 rounded-lg bg-red-300 text-red-700 text-lg font-bold'>
            {decodeURIComponent(resolvedSearchParams.error as string)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Page;