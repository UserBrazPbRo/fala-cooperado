"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { AgencySelect } from "@/app/feedback/components/agency-select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import api from "@/service/api";
import { toast } from "react-toastify";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userSchema = z.object({
  login: z.string().min(1, { message: "Login é obrigatório" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  paId: z.preprocess((val) => {
    console.log("val", val);
    return Number(val);
  }, z.number({ required_error: "Campo obrigatório", invalid_type_error: "Campo obrigatório" })),
  type: z.string().min(1, { message: "Tipo é obrigatório" }),
});

type UserFormValues = z.infer<typeof userSchema>;

export function InsertUserModal({
  onUserInserted,
}: {
  onUserInserted: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { login: "", password: "", type: "" },
  });

  async function onSubmit(values: UserFormValues) {
    setIsLoading(true);
    try {
      await api.post("/user", values);
      toast.success("Usuário inserido com sucesso!");
      onUserInserted();
    } catch (error) {
      toast.error("Erro ao inserir usuário!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-700">
          Inserir Usuário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold mb-4">
          Inserir Usuário
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o login" {...field} />
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
                      placeholder="Insira a senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AgencySelect {...form} />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    disabled={!!isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a sua razão..."></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Delegado">Delegado</SelectItem>
                      <SelectItem value="Consad">Consad</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-400"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
