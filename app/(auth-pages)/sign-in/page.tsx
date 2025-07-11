import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
   
    <form className="flex-1 flex flex-col  w-full md:w-1/2 px-10 p-6 rounded-lg shadow-xl">
      <h1 className="text-2xl font-medium">Iniciar sesión</h1>
     
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Correo</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Contraseña</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            No recuerda su contraseña?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="tu contraseña"
          required
        />
        <SubmitButton pendingText="Iniciando..." formAction={signInAction}>
          Iniciar sesión
        </SubmitButton>
        <p className="text-sm text-foreground">
        No tienes cuenta?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Participa ya!
        </Link>
        </p>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
