import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createClient } from '@/utils/supabase/server';
import React from 'react'
export const dynamic = 'force-dynamic';
async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[]  }>;

}) {
const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

 let { data: data, error:errorPayments} = await supabase
  .from('payments')
  .select("*")
  .eq('user', user?.id)

    const queryParams= await searchParams
    if(queryParams.query && data){
      data.filter((e:any)=>e.status == queryParams?.query )

    }

    const startIndex = "page" in queryParams && queryParams?.page ? (Number(queryParams?.page) * 10): 0;
    const endIndex = startIndex + 10;
    const paginatedData = data?.slice(startIndex, endIndex) ?? [];
  return (
    <section className='flex flex-col gap-6 w-full p-10'>
    <h1 className='px-28  font-bold text-4xl text-slate-700'>Pagos</h1>
            <div className='min-h-[70vh]'>
              <Table className=''>
            <TableCaption>
              
            </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium text-center">Id</TableHead>
                  <TableHead className="font-medium text-center min-w-[200px]">Monto</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Numeros</TableHead>
                  <TableHead className="font-medium min-w-[150px] text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='cursor-pointer'>
               {paginatedData?.map((items:any,index:number)=>{
                return  <TableRow key={index}>
                <TableCell className="font-medium min-w-[200px] text-center">{items?.id}</TableCell>
                <TableCell className="font-medium  text-center">{items?.monto}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center flex gap-2">{items?.numbers.map((i:any,index:number)=>{return <span key={index} className='p-2 rounded-lg text-xs w-fit h-fit bg-primary text-white font-bold'>{i.padStart(4, "0")}</span>})}</TableCell>
                <TableCell className="font-medium min-w-[150px] text-center">{!(items?.status)?"Por validar":"Validado"}</TableCell>
              </TableRow>
               })}
              </TableBody>
              <TableFooter className='w-full flex items-center justify-center'>
              

              </TableFooter>
              
              
            </Table>
            </div>
            <div className='w-full items-center justify-center'>
              <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href={`/protected/dashboard/users/tickets?page=${Number(queryParams?.page)>=1 ? Number(queryParams?.page)-1 : 0}` }/>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href={"/protected/dashboard/users/tickets?page="+queryParams?.page}>{queryParams?.page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href={`/protected/dashboard/users/tickets?page=${Number(queryParams?.page)>=0 ? paginatedData!.length>=10? Number(queryParams?.page)+1:Number(queryParams?.page):1}` } />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

              </div>
    </section>
  )
}

export default Page