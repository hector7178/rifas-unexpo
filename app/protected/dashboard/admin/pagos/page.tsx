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
import { SubmitButton } from '@/components/submit-button';
export const dynamic = 'force-dynamic';
async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[]  }>;

}) {

  const getUser= async (user:string)=>{
    let { data: profile, error:errorprofile } = await supabase
        .from('profile')
        .select('*')
        .eq("user_id", user)
    
        if(!profile){
         return {name:"",phone:""}
        }

        return {name:profile[0]?.name,phone:profile[0]?.phone}
  }

  const getData = await fetch(`${process.env.URL}/api/admin/Payments`,{method:"GET"})
    let data = await  getData.json()
    
      const supabase = await createClient();

    const queryParams= await searchParams
    const startIndex = "page" in queryParams && queryParams.page ? (Number(queryParams.page) * 10): 0;
    const endIndex = startIndex + 10;
    let paginatedData = data?.payments?.slice(startIndex, endIndex);

    if(queryParams.query){
      paginatedData = data.payments.filter( (e:any)=> e["trans_number"].includes(queryParams.query))
      
    }

    

  
    const consultar=async (formData:FormData)=>{
      "use server"
      const nombre = formData.get("nombre")
      if(nombre){
       return redirect(`/protected/dashboard/admin/pagos?page=0&query=${nombre}`)
      }
    }
  return (
    <section className='flex flex-col gap-6 w-full md:p-10'>
      <div className='flex flex-row gap-4'>
        <div className='flex flex-row justify-between w-full'>
          <h1 className='md:px-28  font-bold text-4xl text-primary'>Pagos</h1>
          <form action={consultar} className='flex flex-row gap-2 items-center' >
            <div className='flex flex-col gap-2 items-center'>
              <label htmlFor="nombre">Buscar por número de transferencia</label>
              <Input type='text' id='nombre' name='nombre' />
            </div>
             <SubmitButton pendingText='Consultando...' className='bg-primary p-2 rounded-lg w-fit h-fit'>Filtrar</SubmitButton>
          </form>
        </div>
      
      <div className={`${queryParams?.error?"bg-red-300 text-white font-bold":queryParams?.message?"bg-green-600 text-white font-bold":" hidden"}  py-2 px-4 rounded-lg `}>
        <span className=''>{queryParams?.error ?<>Error: {queryParams?.error}</>: <>Mensaje: {queryParams?.message}</>}</span>
      </div>
      </div>
    
    <Table >
            <TableCaption>
              
            </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium text-center">Id</TableHead>
                  <TableHead className="font-medium text-center min-w-[200px]">Usuario</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Numeros</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Numero de tranferencia</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Estado</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Teléfono</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
               {paginatedData?.map(async (items:any,index:number)=>{
                return  <TableRow key={index} >
                <TableCell className="font-medium min-w-[200px] text-center">{items?.id}</TableCell>
                <TableCell className="font-medium  text-center">{(await getUser(items?.user))?.name}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center">{items?.numbers?.length}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center">{items?.trans_number}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center">{items?.status?"Validado":"Por validar"}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center">{(await getUser(items.user))?.phone}</TableCell>
               
                <TableCell className="font-medium min-w-[150px] text-center flex flex-row items-center justify-center gap-2">
                  <ModalContact phone={(await getUser(items?.user))?.phone}/>
                    
                  <Link className='px-4 p-2 rounded-lg bg-primary/50 text-white font-bold' href={`/protected/dashboard/admin/pagos/verify/${items?.id}`}>Ver</Link>
                </TableCell>
              
              </TableRow>
               })}
              </TableBody>
              <TableFooter className='w-full flex items-center justify-center'>
              

              </TableFooter>
              
              
            </Table>
            <div className='w-full items-center justify-center'>
              <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href={`/protected/dashboard/admin/pagos?page=${Number(queryParams?.page)>=1 ? Number(queryParams?.page)-1 : 0}${queryParams?.query?`&query=${queryParams?.query}`:""}` }/>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href={`/protected/dashboard/admin/pagos?${queryParams?.query?`query=${queryParams?.query}`:""}&page=`+queryParams?.page}>{queryParams?.page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href={`/protected/dashboard/admin/pagos?page=${data?.payments?.length> (startIndex+10)? Number(queryParams?.page)+1 :Number(queryParams?.page)}${queryParams?.query?`&query=${queryParams?.query}`:""}` } />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

              </div>
    </section>
  )
}

export default Page