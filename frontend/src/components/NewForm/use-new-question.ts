import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormsStateType, formsActions } from '../../store/forms';
import { OptionType, QuestionOptionType } from './types';
import { notEmpty } from './validations';

export const useNewQuestion = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state: { forms: FormsStateType }) => state.forms.currentForm);
  const [questionDescription, setQuestionDescription] = useState('');
  const [questionType, setQuestionType] = useState<OptionType>('text');
  const [questionOptions, setQuestionOptions] = useState<QuestionOptionType[]>([]);
  const [questionOptionDescription, setQuestionOptionDescription] = useState('');
  const [questionError, setQuestionError] = useState<string | null>(null);

  const addQuestionHandler = () => {
    if (!notEmpty(questionDescription)) {
      setQuestionError('A pergunta deve ter uma descrição');
      return;
    }
    if (questionOptions.length === 0 && questionType === 'multiple_choice') {
      setQuestionError('Uma questão de multipla escolha deve ter pelo menos uma alternativa');
      return;
    }

    dispatch(
      formsActions.addQuestion({
        id: currentForm.questions.length,
        description: questionDescription,
        type: questionType,
        options: questionOptions,
      })
    );
    setQuestionOptions([]);
    setQuestionDescription('');
    setQuestionError(null);
  };

  const addQuestionOptionHandler = () => {
    if (!notEmpty(questionOptionDescription)) {
      setQuestionError('A alternativa deve ter uma descrição');
      return;
    }

    setQuestionOptions((oldQuestionOptions) => {
      return [
        ...oldQuestionOptions,
        { id: oldQuestionOptions.length.toString(), description: questionOptionDescription, isCorrect: oldQuestionOptions.length === 0 },
      ];
    });
    setQuestionOptionDescription('');
    setQuestionError(null);
  };

  const changeQuestionDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionDescription(event.currentTarget.value);
  };

  const changeQuestionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(event.currentTarget.value as OptionType);
  };

  const changeQuestionOptionDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionOptionDescription(event.currentTarget.value);
  };

  const changeQuestionOptionIsCorrectNotCreated = (questionOptionId: string) => {
    const newQuestOptions = [...questionOptions];
    newQuestOptions.forEach((questOption) => {
      questOption.isCorrect = false;
      if (questOption.id === questionOptionId) questOption.isCorrect = true;
    });
    setQuestionOptions(newQuestOptions);
  };

  return {
    questionDescription,
    questionType,
    questionOptions,
    questionOptionDescription,
    questionError,
    addQuestionHandler,
    addQuestionOptionHandler,
    changeQuestionDescriptionHandler,
    changeQuestionType,
    changeQuestionOptionDescription,
    changeQuestionOptionIsCorrectNotCreated,
  };
};
