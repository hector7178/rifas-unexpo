
import UserBuyTicketsForm from '@/components/buyForms/UserBuyTicketForm';
import { createClient } from '@/utils/supabase/server';
import React from 'react'
export const dynamic = 'force-dynamic';
async function Page(props: {
  searchParams: Promise<any>;
}) {
  const searchParams= await props.searchParams

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

   const getprice=async ()=>{
    try{
      const getTasa= await fetch("https://ve.dolarapi.com/v1/dolares/paralelo",{method:"GET"})
      const resTasa= await getTasa?.json()
      const supabase = await createClient();
      let { data: settings, error } = await supabase
      .from('settings')
      .select("*")
      if(!settings) return null;
      return {price: settings[0].price, tasa:settings[0].d_paralelo?resTasa.promedio:settings[0].dolar,monto:settings[0].ntickets }
          
    }catch(err){
      return {price: "", tasa:"",monto:""}
    }
   
        
  }

  let { data: methods, error:errormethod } = await supabase
  .from('method')
  .select('*')

  let { data: profile, error } = await supabase
  .from('profile')
  .select("*")
  .eq('user_id', user?.id)

  return (
    <section className='flex flex-row gap-4 '>
        <div className="overflow-hidden relative flex flex-col w-full min-h-[80vh] gap-4 md:basis-1/2 mx-auto p-6 md:px-10 rounded-lg shadow-xl items-center">
        {searchParams.error?
        <p className="w-full h-fit text-md text-red-600 bg-red-200 rounded-lg p-2"><span className="font-bold text-red-800">Error:</span> {searchParams?.error}</p>
        :null} 
       <h2 className="text-3xl text-primary font-bold opacity-90 text-center md:text-start animate pulse"> PARTICIPA Y GANA!</h2>
        <span className="text-xs text-center">Los números son otorgados de forma totalmente  aleatoria previa confirmación del pago, recuerda que si te sale alguno de los siguientes numeros: 7777, 3333 y 8888. Obtendras un premio que será entregado de manera inmediata al ganador. MUCHA SUERTE!</span>
      
         <table className="table-auto gap-2 ">
            <thead className="">
              <tr className="border-2 border-b-primary/60  border-transparent rounded-xl">
                <th className="border-r-2 border-primary/60 text-center max-w-[100px] p-2 text-foregound-primary">Precio por ticket</th>
                <th className="border-r-2 border-primary/60 text-center max-w-[100px] p-2 text-foregound-primary">Tasa del dia</th>
                <th className="border-l-2 border-primary/60 text-center max-w-[100px] p-2 text-foregound-primary">Compra mínima</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r-2 border-primary/60 text-center p-4">{(await getprice())?.price*(await getprice())?.tasa}Bs</td>
                <td className="border-r-2 border-primary/60 text-center p-4">{(await getprice())?.tasa}Bs.</td>
                <td className="border-l-2 border-primary/60 text-center p-4 max-w-[100px]">Apartir de {(await getprice())?.monto/(await getprice())?.price} tickets</td>
              </tr>
              
            </tbody>
          </table>
         <UserBuyTicketsForm searchParams={searchParams} methods={methods ?? []} n={(((await getprice())?.monto??0)/(await getprice())?.price)} userData={profile && profile[0]}/>
       
       </div>
    </section>
  )
}

export default Page