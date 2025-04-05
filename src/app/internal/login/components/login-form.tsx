import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/auth-store";
import { fetchProfile, sendAuth } from "@/service/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FalaCooperadoTitle } from "@/app/components/fala-cooperado-title";
import useUserStore from "@/store/user-store";

const loginSchema = z.object({
  login: z.string({ required_error: "Username inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
  });
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useUserStore((state) => state.setUser);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      console.log("Token encontrado:", token);
      fetchProfile(token)
        .then((result) => {
          setUser(result.data);
          router.push("/internal");
        })
        .catch((error) => {
          console.error("Erro ao carregar o perfil:", error);
        });
    }
  }, [token]);

  console.log("Token salvo no Zustand:", useAuthStore.getState().token);
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      console.log("Login data:", values);

      try {
        const response = await sendAuth(values);
        const { access_token } = response;
        console.log("Token recebido:", access_token);
        toast.success("Login realizado com sucesso");
        setToken(access_token);
      } catch (err) {
        toast.error("Login ou senha inválidos");
        form.setError("login", {});
        form.setError("password", {
          type: "manual",
          message: "Login ou senha inválidos",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-white w-full max-w-md p-8 rounded-lg shadow-md text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu login" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full h-12 bg-teal-500 font-bold hover:bg-teal-700"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { LoginForm };
