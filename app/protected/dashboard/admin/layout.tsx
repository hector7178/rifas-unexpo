import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export  default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
   let redirectPath: string | null = null

    try {
      const supabase = await createClient();
      
      const {
        data: { user },
      } = await supabase?.auth?.getUser();
      
    let { data: profile, error } = await supabase
    .from('profile')
    .select("*")
    .eq('user_id', user?.id)
  
     if(!profile){
      redirectPath ="/sign_in";
     }     
    if(profile !== null ){
        if(profile[0]?.rol !== "admin"){
          redirectPath = "/protected/dashboard/users";
        
        }
    }
        
    } catch (error) {
        //Rest of the code
        console.log(error)
        redirectPath = `/`
    } finally {
        //Clear resources
        if (redirectPath)
            redirect(redirectPath)
    }
    
    return (
    <>
        {children}
    </>
        
    )
  }