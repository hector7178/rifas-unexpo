import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ChevronRight, CircleDollarSign, Gift, HandCoins, Home, Menu, Settings, Ticket, Trophy, UserCheckIcon } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: profile, error } = await supabase
  .from('profile')
  .select("*")
  .eq('user_id', user?.id)

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Iniciar sesión</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Participa ya!</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4 font-bold">
      hola, {profile && profile[0]?.name}!

      <div className="flex w-fit h-fit justify-end items-center">
          <Sheet>
          <SheetTrigger><Menu className="hover:scale-95 hover:opacity-80 w-10 h-10 p-2 rounded-lg bg-background"/></SheetTrigger>
          <SheetContent className="flex gap-10 flex-col">
            <DialogTitle className="text-primary font-bold">Menu</DialogTitle>
              <div className="flex flex-col h-full gap-4 justify-between">

              {profile && ( profile[0]?.rol =="admin" ? 
              <div className="basis-3/4 flex flex-col gap-4">
              <Link className="hover:opacity-70 text-lg font-bold flex flex-row justify-between"  href={`/protected/dashboard/admin`}><span className="flex flex-row gap-2" ><Home/>Inicio</span><span><ChevronRight/></span></Link>
              <Link className="hover:opacity-70 text-lg font-bold flex flex-row justify-between"  href={`/protected/dashboard/admin/pagos?page=0`}><span className="flex flex-row gap-2" ><HandCoins/>Pagos</span><span><ChevronRight/></span></Link>
              <Link  className="hover:opacity-70 text-lg font-bold flex flex-row justify-between" href={`/protected/dashboard/admin/config`}><span className="flex flex-row gap-2" ><Settings/>Ajustes</span><span><ChevronRight/></span></Link>
              <Link  className="hover:opacity-70 text-lg font-bold flex flex-row justify-between" href={`/protected/dashboard/admin/top`}><span className="flex flex-row gap-2" ><CircleDollarSign/>Top compradores</span><span><ChevronRight/></span></Link>
              <Link  className="hover:opacity-70 text-lg font-bold flex flex-row justify-between" href={`/protected/dashboard/admin/ganador`}><span className="flex flex-row gap-2" ><Trophy/>Ganador</span><span><ChevronRight/></span></Link>
              <Link  className="hover:opacity-70 text-lg font-bold flex flex-row justify-between" href={`/protected/dashboard/admin/datausers`}><span className="flex flex-row gap-2" ><UserCheckIcon/>Editar usuarios</span><span><ChevronRight/></span></Link>
             
              </div>
              :
              <div className="basis-3/4 flex flex-col gap-4">
              <Link className="hover:opacity-70 text-lg font-bold flex flex-row justify-between"  href={`/protected/dashboard/users/`}><span className="flex flex-row gap-2" ><Home/>Inicio</span><span><ChevronRight/></span></Link>
              <Link className="hover:opacity-70 text-lg font-bold flex flex-row justify-between"  href={`/protected/dashboard/users/tickets`}><span className="flex flex-row gap-2" ><Ticket/>tickets</span><span><ChevronRight/></span></Link>
              <Link className="hover:opacity-70 text-lg font-bold flex flex-row justify-between"  href={`/protected/dashboard/users/buy`}><span className="flex flex-row gap-2" ><Gift/>Participa</span><span><ChevronRight/></span></Link>
              <Link  className="hover:opacity-70 text-lg font-bold flex flex-row justify-between" href={`/protected/dashboard/users/config`}><span className="flex flex-row gap-2" ><Settings/>Perfil</span><span><ChevronRight/></span></Link>
              
              </div>)
              }
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-5 items-center">
                  <Avatar className="w-12 h-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{profile && profile[0]?.name}</span>
                </div>
                <form className="basis-1/4" action={signOutAction}>
                <Button type="submit" variant={"outline"}>
                  Cerrar sesión
                </Button>
                </form>
              </div>
              
                    
              </div>
              
            </SheetContent>
          </Sheet>
      </div>
     
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Iniciar sesión</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Participa ya!</Link>
      </Button>
    </div>
  );
}
