export interface GetRoomQuestions {
  questions: {
    id: string;
    question: string;
    answer: string | null;
    createdAt: string;
  }[];
}
