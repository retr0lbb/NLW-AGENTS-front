import { useQuery } from '@tanstack/react-query';
import type { GetRoomQuestions } from '@/types/get-rooms-questions.type';

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      );

      const result: GetRoomQuestions[] = await response.json();

      return result;
    },
  });
}
