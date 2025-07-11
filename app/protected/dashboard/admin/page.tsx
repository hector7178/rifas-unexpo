import { redirect } from 'next/navigation';
import React from 'react'
import { createClient } from '../../../../utils/supabase/server';
import { Button } from '../../../../components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../../../components/ui/sheet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../../../components/ui/pagination';
import Link from 'next/link';
import { SubmitButton } from '@/components/submit-button';
import {arr } from "../../../actions"

export const dynamic = 'force-dynamic'

async function Page() {
      
  const supabase = await createClient();
    const getData = await fetch(`${process.env.URL}/api/admin/getData`,{method:"GET"})
      const data = await  getData?.json()

      
  return (
    <section className='flex flex-col gap-6 w-full'>
       <h1 className='px-28  font-bold text-4xl text-slate-700'>Inicio</h1>

     
        <div className='flex flex-col md:flex-row gap-4 w-full items-center justify-center '>
        <Card className="w-full md:basis-1/4">
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>Numero de usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <span className='text-3xl font-bold text-primary '>{data?.users}</span>

          </CardContent>
         
        </Card>
        <Card className="w-full md:basis-1/4">
          <CardHeader>
            <CardTitle>Tickets </CardTitle>
            <CardDescription>Tickets totales</CardDescription>
          </CardHeader>
          <CardContent>
          <span className='text-3xl font-bold text-primary '>{data?.ticketsDisponibles}</span>
         
          </CardContent>
          
        </Card>
        <Card className="w-full md:basis-1/4">
          <CardHeader>
            <CardTitle>Vendidos</CardTitle>
            <CardDescription>Tickets Vendidos</CardDescription>
          </CardHeader>
          <CardContent>
          <span className='text-3xl font-bold text-primary '>{data?.tickets-data?.ticketsDisponibles}</span>
          </CardContent>
        </Card>
        </div>
        <div className='flex flex-col  gap-4 w-full rounded-lg items-center justify-center p-4'>
        <div className='relative flex items-center justify-center w-full'>
          <h2 className='text-2xl font-bold text-foreground relative'>Historial de pagos</h2> 
          <Link href={"/protected/dashboard/admin/pagos?page=0"} className='absolute right-0 md:right-10 p-2 w-fit h-fit rounded-lg text-md bg-primary text-white font-bold'>Ver Todos</Link>
        </div>
        <Table  className=''>
        <TableCaption>
          
        </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-center">Id</TableHead>
              <TableHead className="font-medium text-center min-w-[200px]">Usuario</TableHead>
              <TableHead className="font-medium min-w-[150px] text-center">Numeros</TableHead>
              <TableHead className="font-medium min-w-[150px] text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='cursor-pointer'>
           {data.payments.map((items:any,index:number)=>{
            return  <TableRow key={index}>
            <TableCell className="font-medium min-w-[200px] text-center">{items?.id}</TableCell>
            <TableCell className="font-medium  text-center">{items?.user}</TableCell>
            <TableCell className="font-medium min-w-[150px] text-center">{items?.numbers?.length}</TableCell>
            <TableCell className="font-medium min-w-[150px] text-center">{items?.status?"Validado":"Por validar"}</TableCell>
          </TableRow>
           })}
          </TableBody>
        </Table>
        </div>

    </section>
  )
}

export default Page