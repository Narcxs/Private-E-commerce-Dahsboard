"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { loginSchema, LoginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (tData: LoginSchema) => {
    const { email, password } = tData;

    // Créer un toast de chargement et stocker son ID
    const toastId = toast.loading("Connexion en cours...");

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          toast.success("Connexion réussie ✅", {
            id: toastId,
            description: "Redirection en cours...",
          });
        },
        onError: (ctx) => {
          toast.error("Erreur de connexion ❌", {
            id: toastId,
            description: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Se connecter</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Entrez vos informations ci-dessous pour vous connecter
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@exemple.com"
            required
            {...register("email")}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            {...register("password")}
          />
        </div>
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Ou continuer avec
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Pas encore de compte ?{" "}
        <a href="/sign-up" className="underline underline-offset-4">
          S&apos;inscrire
        </a>
      </div>
    </form>
  );
}
