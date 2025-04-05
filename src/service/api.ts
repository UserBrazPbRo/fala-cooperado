import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

console.log("API_URL", API_URL);
export interface ErrorResponse {
  error: string[];
}

export interface Reason {
  id: number;
  group: string;
  description: string;
}

export interface Agency {
  id: number;
  description: string;
}

export interface Feedback {
  paId: number;
  reasonId: number;
  feedback: string;
  email?: string;
  title: string;
  cpf?: string;
  terms: boolean;
}

export interface FeedbackResponse {
  paId: number;
  reasonId: number;
  title: string;
  response: string;
  feedback: string;
  code: string;
  email?: string;
  cpf?: string;
  terms: boolean;
}

export interface AuthLogin {
  login: string;
  password: string;
}

export const fetchReasons = async (): Promise<Reason[]> => {
  const response = await api.get<Reason[]>("/reason");
  return response.data;
};

export const fetchAgency = async (): Promise<Agency[]> => {
  const response = await api.get<Agency[]>("/pa");
  return response.data;
};

export async function fetchFeedbackByCode(
  code: string
): Promise<FeedbackResponse> {
  console.log(code);
  const response = await api.get<FeedbackResponse>(`/feedback/code/${code}`);
  return response.data;
}

export const sendAuth = async ({
  login,
  password,
}: AuthLogin): Promise<{ access_token: string }> => {
  const response = await api.post<{ access_token: string }>("/auth/login", {
    login,
    password,
  });
  return response.data;
};

export const fetchProfile = async (token: string): Promise<any> => {
  return await api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sendFeedback = async ({
  feedback,
  paId,
  reasonId,
  title,
  cpf,
  email,
}: Feedback): Promise<FeedbackResponse> => {
  const response = await api.post<Feedback>("/feedback", {
    feedback,
    paId,
    reasonId,
    title,
    cpf,
    email,
  });
  return response.data as FeedbackResponse;
};

export default api;
