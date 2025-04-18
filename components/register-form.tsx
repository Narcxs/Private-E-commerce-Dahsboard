"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { registerSchema, RegisterSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (tData: RegisterSchema) => {
    const { email, password, name } = tData;

    const toastId = toast.loading("Inscription en cours...");

    const { data, error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          toast.success("Inscription réussie ✅", {
            id: toastId,
            description: "Redirection en cours...",
          });
          redirect("/sign-in");
        },
        onError: (ctx) => {
          toast.error("Erreur d'inscription ❌", {
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
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Entrez vos informations ci-dessous pour créer votre compte
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="Nom">Nom</Label>
          <Input
            id="Nom"
            type="text"
            placeholder="Nom"
            required
            {...register("name")}
          />
        </div>
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
        Déjà un compte ?{" "}
        <a href="/sign-in" className="underline underline-offset-4">
          Se connecter
        </a>
      </div>
    </form>
  );
}
