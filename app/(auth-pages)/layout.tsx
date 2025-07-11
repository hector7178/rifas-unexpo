import Link from "next/link";
import { hasEnvVars } from "../../utils/supabase/check-env-vars";
import { EnvVarWarning } from "../../components/env-var-warning";
import HeaderAuth from "../../components/header-auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

   const supabase = await createClient();
      
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if(user){
        redirect("/protected/dashboard/users")
      }
  return (
    <>
      <nav className="w-full bg-background flex justify-center border-b border-b-foreground/10 h-18 relative  shadow-xl"  style={{"boxShadow": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"}}>
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="flex gap-5 items-center font-semibold">
                <Link href={"/"} className="text-primary font-bold text-lg md:text-2xl">RIFASVILLA</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
      </nav>
     <div className="max-w-7xl flex flex-col gap-12 items-center w-full p-6 md:p-10">
    
      {children}
    </div>
    </>
   
  );
}
