
import { FormMessage, Message } from "@/components/form-message";
import { createClient } from "@/utils/supabase/server";
import RegisterPay from "@/components/buyForms/RegisterPay";
import SeeMonto from "@/components/buyForms/SeeMonto";

export default async function Signup(props: {
  searchParams: Promise<any>;
}){
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  
  let { data: methods, error:errormethod } = await supabase
  .from('method')
  .select('*')
          

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
   
  
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

  return (
    <section className="flex flex-col w-full  h-fit items-center justify-center">
     
      <div className="flex flex-col gap-2 w-full h-fit md:w-1/2">
      <h2 className="text-3xl text-primary font-bold opacity-90 text-center  animate pulse"> PARTICIPA Y GANA!</h2>
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
                <td className="border-l-2 border-primary/60 text-center p-4">Apartir de {(await getprice())?.monto/(await getprice())?.price} tickets</td>
              </tr>
              
            </tbody>
          </table>
      {searchParams.step =="register"&&(Number(searchParams.number)>=(((await getprice())?.monto??0)/(await getprice())?.price)) && searchParams.method != undefined?
      <RegisterPay searchParams={searchParams}/>:
      <SeeMonto searchParams={searchParams} n={(((await getprice())?.monto??0)/(await getprice())?.price)} methods={methods} />
      }
      </div>
      
      
    </section>
  );
}
