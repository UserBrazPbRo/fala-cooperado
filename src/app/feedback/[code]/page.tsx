"use client";

import { use, useEffect, useState } from "react";
import api, { fetchFeedbackByCode } from "@/service/api";
import { ArrowLeft, Loader2Icon, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FeedbackResponse {
  paId: number;
  title: string;
  reasonId: number;
  feedback: string;
  code: string;
  email?: string;
  response: string;
  cpf?: string;
  terms: boolean;
}

interface InteractionResponse {
  id: number;
  interaction: string;
  create_at: string;
  user: { login: string; type: string };
}

export default function Code({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [data, setData] = useState<InteractionResponse[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { code } = use(params);

  useEffect(() => {
    async function loadFeedback() {
      try {
        const data = await fetchFeedbackByCode(code);
        setFeedback(data);
        await getInteractions();
      } catch (err) {
        setError("Erro ao carregar os detalhes do feedback.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeedback();
  }, [code]);

  async function getInteractions() {
    setIsLoading(true);
    try {
      const result = await api.get("/interaction/feedback/code/" + code);

      setData(result.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="flex flex-col gap-4 w-full h-full items-center justify-center">
        <div className="flex w-full h-full items-center align-middle justify-center bg-white">
          <Loader2Icon className="animate-spin" /> Loading...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-col gap-4 w-full h-full items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </main>
    );
  }

  if (!feedback) {
    return (
      <main className="flex flex-col gap-4 w-full h-full items-center justify-center text-white text-xl">
        <p className="text-white text-xl">Feedback não encontrado.</p>

        <Link href="/">
          <div className="flex gap-2 align-middle items-center border rounded p-2">
            <ArrowLeft /> Voltar
          </div>
        </Link>
      </main>
    );
  }

  return (
    <div className="p-2">
      <Link href="/">
        <div className="flex gap-2 align-middle items-center border rounded p-2 text-white w-fit ">
          <ArrowLeft /> Voltar
        </div>
      </Link>
      <main className="flex flex-col gap-4 w-full h-full items-center justify-items-center align-middle justify-center">
        <h1 className="text-5xl text-center font-semibold text-white">
          Detalhes do Sugestão
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md w-3xl">
          <p>
            <strong>Título:</strong> {feedback.title}
          </p>
          <p>
            <strong>Descrição:</strong> {feedback.feedback}
          </p>

          <p>
            <strong>Código:</strong> {feedback.code}
          </p>

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
        </div>
      </main>
    </div>
  );
}
