"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuthStore from "@/store/auth-store";
import api, { fetchProfile } from "@/service/api";
import { useRouter } from "next/navigation";
import { Loader2Icon, Pencil, TableColumnsSplitIcon } from "lucide-react";
import { FeedbackModal } from "./feedback-modal";

export interface Feedback {
  id: number;
  title: string;
  pa: { description: string };
  reason: { group: string; description: string };
  feedback: string;
  email?: string;
  cpf?: string;
  create_at: string;
}

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!token) return;

      try {
        setIsLoading(true);
        const response = await api.get<Feedback[]>("/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, [token]);

  if (isLoading) {
    return (
      <main className="flex flex-col gap-4 w-full h-full items-center justify-center">
        <div className="flex w-full h-full items-center align-middle justify-center bg-white">
          <Loader2Icon className="animate-spin" /> Loading...
        </div>
      </main>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold">Sugestões</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">#</TableHead>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Sugestão</TableHead>
            <TableHead className="font-bold">PA</TableHead>
            <TableHead className="font-bold">Razão</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">CPF</TableHead>
            <TableHead className="font-bold">Data da criação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.id}</TableCell>
              <TableCell>{feedback.title}</TableCell>
              <TableCell>
                {feedback.feedback.length > 40
                  ? feedback.feedback.slice(-40) + "..."
                  : feedback.feedback}
              </TableCell>
              <TableCell>{feedback.pa.description || ""}</TableCell>
              <TableCell>
                {feedback.reason.group + " - " + feedback.reason.description ||
                  ""}
              </TableCell>
              <TableCell>{feedback.email || ""}</TableCell>
              <TableCell>{feedback.cpf || ""}</TableCell>
              <TableCell>
                {new Date(feedback.create_at).toLocaleDateString() || ""}
              </TableCell>
              <TableCell>
                <FeedbackModal feedback={feedback}>
                  <button>
                    <span className="sr-only">Edit task</span>
                    <Pencil size={20} />
                  </button>
                </FeedbackModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              {feedbacks.length === 0 && "Não foram encontradas sugestões..."}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default FeedbackTable;
