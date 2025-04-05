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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReasonSelect } from "./reason-select";
import { Checkbox } from "@/components/ui/checkbox";
import { sendFeedback } from "@/service/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCPF } from "@/utils/formatters"; // Função utilitária para formatar CPF
import { toast } from "react-toastify";
import { AgencySelect } from "./agency-select";

const formSchema = z.object({
  title: z.string({
    required_error: "Campo obrigatório",
    invalid_type_error: "Campo obrigatório",
  }),
  paId: z.preprocess((val) => {
    console.log("val", val);
    return Number(val);
  }, z.number({ required_error: "Campo obrigatório", invalid_type_error: "Campo obrigatório" })),
  reasonId: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Campo obrigatório",
    })
  ),
  feedback: z.string({ required_error: "Campo obrigatório" }),
  email: z.union([z.string(), z.string().email()]).optional(),
  cpf: z.string().optional(),
  terms: z
    .boolean({ required_error: "Você deve aceitar os termos de uso" })
    .refine((value) => value === true, {
      message: "Você deve aceitar os termos de uso",
    }),
});

function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", cpf: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await sendFeedback(values);
      toast.success("Sugestão enviada com sucesso!");
      router.push(`/feedback/${result.code}`);
    } catch (error) {
      toast.error("Erro ao enviar sugestão!");
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`flex flex-col gap-4 bg-white w-3xl h-auto p-12 rounded-2xl ${
        isLoading ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-4">
              <AgencySelect {...form} />
              <ReasonSelect {...form} />
            </div>

            <p className="text-sm">
              Caso queira receber notificações do status da sua demanda,
              preencha os campos abaixo:
            </p>

            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Insira aqui o seu email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={14}
                        type="text"
                        placeholder="Insira aqui seu CPF..."
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(formatCPF(e.target.value))
                        } // Aplica a máscara
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={250}
                      type="text"
                      placeholder="Titulo da sua sugestão..."
                      className="max-h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      maxLength={3000}
                      className="max-h-40"
                      placeholder="Descreva aqui sua sugestão..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="place-self-end">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Eu li e concordo com os{" "}
                          <a href="/termos" className="underline text-teal-400">
                            termos de uso
                          </a>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            className="w-full h-12 bg-teal-500 font-bold hover:bg-teal-700"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar feedback"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { FeedbackForm };
