export interface CreateQuestionResponse {
  question: {
    id: string;
    roomId: string;
    question: string;
    answer: string;
    createdAt: string;
  }[];
}
