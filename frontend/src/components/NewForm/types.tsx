export type FormType = {
  id: string;
  title: string;
  description: string;
  questions: QuestionType[];
  errors: { title?: string; description?: string };
};

export type OptionType = 'text' | 'multiple_choice';

export type QuestionType = {
  id: string;
  description: string;
  type: OptionType;
  options?: QuestionOptionType[];
  answer?: string;
};

export type QuestionOptionType = {
  id: string;
  description: string;
  isCorrect: boolean;
};
