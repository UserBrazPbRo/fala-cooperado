"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  search: z.string({ required_error: "Username inválido" }),
});
function SearchFeedback() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { search: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    router.push("/feedback/" + values.search);
  }

  return (
    <div className="flex flex-col gap-4 bg-white w-full  max-w-md p-8 rounded-lg shadow-md text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesquisar sugestão</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira o código da sua sugestão    "
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
          >
            Pesquisar
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { SearchFeedback };
