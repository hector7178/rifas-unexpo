import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../../../../components/ui/table'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../../../../components/ui/pagination'
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Wsp from '@/components/Wsp';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import ModalContact from '@/components/ModalContact';
import { arr } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';

export const dynamic = 'force-dynamic';


async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[]  }>;

}) {
   const supabase = await createClient();

    const getUsers= async ()=>{
      let { data: profile, error:errorprofile } = await supabase
          .from('profile')
          .select('ntickets,id')
      
          if(!profile){
           return []
          }
         
        const arrayOrdenado = profile.sort((a:any, b:any) =>{
                
                return b.ntickets.length - a.ntickets.length
        });


          return arrayOrdenado

    }

    const getUser= async (user:string)=>{
        let { data: profile, error:errorprofile } = await supabase
            .from('profile')
            .select('*')
            .eq("id", user)
        
            if(!profile){
             return {name:"",phone:""}
            }
  
            return {name:profile[0].name,phone:profile[0].phone}
      }
  return (
    <section className='flex flex-col gap-6 w-full p-2 md:p-10'>
    <h1 className='px-4 font-bold text-2xl md:text-4xl text-primary'>Top 10 de Compradores</h1>
      <form action={arr}>
        <SubmitButton  type='submit' pendingText='Revalidando...' >Revalidar</SubmitButton>
       </form>
       
    <Table >
            <TableCaption>
              
            </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium text-center">Id</TableHead>
                  <TableHead className="font-medium text-center min-w-[200px]">Usuario</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Numeros</TableHead>
                 <TableHead className="font-medium min-w-[150px] text-center">Teléfono</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
               {(await getUsers())?.slice(0,9).map(async (items:any,index:number)=>{
                return  <TableRow key={index} >
                <TableCell className="font-medium min-w-[200px] text-center">{items?.id}</TableCell>
                <TableCell className="font-medium  text-center">{(await getUser(items.id))?.name}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center">{items?.ntickets?.length}</TableCell>
                 <TableCell className="font-medium min-w-[150px] text-center">{(await getUser(items.id))?.phone}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center flex flex-row items-center justify-center gap-2">
                  <ModalContact phone={(await getUser(items.id))?.phone}/>
                 </TableCell>
              
              </TableRow>
               })}
              </TableBody>
              <TableFooter className='w-full flex items-center justify-center'>
              

              </TableFooter>
              
              
            </Table>
            
    </section>
  )
}

export default Page