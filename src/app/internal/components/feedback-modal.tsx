import React, { ReactNode, useEffect, useState } from "react";
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
import api from "@/service/api";
import useAuthStore from "@/store/auth-store";

interface TaskModalProps {
  feedback: Feedback;
  children: ReactNode;
}

interface InteractionResponse {
  id: number;
  interaction: string;
  create_at: string;
  user: { login: string; type: string };
}

const formSchema = z.object({
  interaction: z.string({
    required_error: "Campo obrigatório",
    invalid_type_error: "Campo obrigatório",
  }),
});

const insertLineBreaks = (str: string, everyN: number) => {
  return str.match(new RegExp(`.{1,${everyN}}`, "g"))?.join("- <br>") || str;
};

export function FeedbackModal({ feedback, children }: TaskModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<InteractionResponse[]>();
  const formattedText = insertLineBreaks(feedback.feedback, 130);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { interaction: "" },
  });
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    getInteractions();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await api.post(
        "/interaction",
        { feedbackId: feedback.id, ...values },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      form.reset();
      await getInteractions();
      toast.success("Sugestão enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar sugestão!");
    } finally {
      setIsLoading(false);
    }
  }

  async function getInteractions() {
    setIsLoading(true);
    try {
      const result = await api.get("/interaction/feedback/" + feedback.id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(result.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col w-full h-fit min-w-5xl ">
        <DialogHeader>
          <DialogTitle> {feedback.title}</DialogTitle>
        </DialogHeader>
        <hr />
        <main className="flex flex-col gap-8 w-full h-fit  ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <p>
                <strong>#:</strong>
              </p>
              <br />
              <p>{feedback.id}</p>
            </div>
            {feedback.cpf && (
              <div className="flex gap-2">
                <p>
                  <strong>CPF:</strong>
                </p>
                <br />
                <p>{feedback.cpf}</p>
              </div>
            )}
            {feedback.email && (
              <div className="flex gap-2">
                <p>
                  <strong>Email:</strong>
                </p>
                <br />
                <p>{feedback.email}</p>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <p>
                <strong>Descrição:</strong>
              </p>
              <br />
              <ScrollArea className="h-20 ">
                <p
                  className="p-2"
                  dangerouslySetInnerHTML={{ __html: formattedText }}
                />
              </ScrollArea>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <strong>Interações:</strong>
            <ScrollArea className="border-2 h-60 rounded-2xl flex flex-col">
              {data?.map((item) => (
                <div key={item.id} className="flex flex-col p-2 border-2">
                  <div className="flex justify-between font-bold">
                    <div>
                      {item.user.login} - {item.user.type}{" "}
                    </div>
                    <div>{new Date(item.create_at).toLocaleDateString()}</div>
                  </div>
                  <div key={item.id}>{item.interaction}</div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 "
            >
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="interaction"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          maxLength={3000}
                          className="max-h-40"
                          placeholder="Descreva aqui sua resposta..."
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
                {isLoading ? "Enviando..." : "Enviar resposta"}
              </Button>
            </form>
          </Form>
        </main>
      </DialogContent>
    </Dialog>
  );
}
