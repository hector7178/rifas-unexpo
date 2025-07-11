import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase?.auth?.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let { data: profile, error } = await supabase
        .from('profile')
        .select("*")
        .eq('user_id', user?.id)
                
  if(profile !== null ){
      if(profile[0]?.rol =="admin"){
        return redirect("/protected/dashboard/admin")
      }
  }

  return redirect("/protected/dashboard/users")
}
