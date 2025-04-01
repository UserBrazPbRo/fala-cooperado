import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@radix-ui/react-checkbox";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  agencia: z.string(),
  razao: z.string(),
  feedback: z.string(),
  email: z.string().optional(),
  cpf: z.string().optional(),
  terms: z.boolean().optional(),
});

function FeedbackForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agencia: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 bg-white w-3xl h-auto p-12 rounded-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="agencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione sua agência</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a sua agência..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="razao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione sua razão do seu feedback</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a razao do seu feedback..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informe seu feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      placeholder="Informe aqui seu feedback..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <hr />
            <p className="text-sm">
              Caso queira receber notificações do status da sua demanda,
              preencha os campos abaixo:
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
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
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira aqui seu CPF..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-full h-12 bg-teal-500 font-bold hover:bg-teal-700  "
            type="submit"
          >
            Enviar feedback
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { FeedbackForm };
