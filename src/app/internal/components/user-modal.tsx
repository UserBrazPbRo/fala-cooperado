import React, { ReactNode, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Feedback } from "./feedback-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "./user-table";

interface UserModalProps {
  user: User;
  children: ReactNode;
}

const formSchema = z.object({
  password: z.string({
    required_error: "Campo obrigatório",
    invalid_type_error: "Campo obrigatório",
  }),
});

export function UserModal({ user, children }: UserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      toast.success("Sugestão enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar sugestão!");
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col w-fit h-fit min-w-2xl ">
        <DialogHeader>
          <DialogTitle> {user.login}</DialogTitle>
        </DialogHeader>
        <hr />
        <main className="flex flex-col gap-4 w-full h-fit  ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <p>
                <strong>#:</strong>
              </p>
              <br />
              <p>{user.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <p>
              <strong>login:</strong>
            </p>
            <br />
            <p>{user.login}</p>
          </div>
          <hr />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 "
            >
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          maxLength={3000}
                          className="max-h-40"
                          placeholder="Escreva a nova senha..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="self-end h-12 bg-teal-500 font-bold hover:bg-teal-700"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Trocar senha"}
              </Button>
            </form>
          </Form>
        </main>
      </DialogContent>
    </Dialog>
  );
}
