import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import Link from "next/link";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ChevronRight, HandCoins, Home, Menu, Settings } from "lucide-react";
import { hasEnvVars } from "../../../utils/supabase/check-env-vars";
import { EnvVarWarning } from "../../../components/env-var-warning";
import HeaderAuth from "../../../components/header-auth";
export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
            
        

  return (
    <>
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-18 relative  shadow-xl"  style={{"boxShadow": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"}}>
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="flex gap-5 items-center font-semibold">
                <Link href={"/"} className="text-primary font-bold text-lg md:text-2xl">RIFASVILLA</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
    </nav>
    <section className="min-h-screen w-full flex flex-col items-center p-8 gap-4">
        
        {children}

    </section>
    </>
    
  );
}
