import { useRoomQuestions } from '@/hook/use-room-questions';
import { QuestionItem } from './question-item';

export function QuestionList(props: { roomId: string }) {
  const { data } = useRoomQuestions(props.roomId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data?.map((question) => {
        return (
          <QuestionItem
            key={question.id}
            question={{
              id: question.id,
              answer: question.answer,
              question: question.question,
              createdAt: question.createdAt,
            }}
          />
        );
      })}
    </div>
  );
}
