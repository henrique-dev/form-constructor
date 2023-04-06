import { useState } from 'react';
import styles from './NewQuestion.module.css';
import { OptionType, QuestionOptionType } from './types';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { FormsStateType, formsActions } from '../../store/forms';
import { notEmpty } from './validations';
import { FieldError } from './FieldError';

export const NewQuestion = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state: { forms: FormsStateType }) => state.forms.currentForm);
  const [questionDescription, setQuestionDescription] = useState('');
  const [questionType, setQuestionType] = useState<OptionType>('text');
  const [questionOptions, setQuestionOptions] = useState<QuestionOptionType[]>([]);
  const [questionOptionDescription, setQuestionOptionDescription] = useState('');
  const [questionError, setQuestionError] = useState<string | null>(null);

  const addQuestionHandler = () => {
    if (!notEmpty(questionDescription)) {
      setQuestionError("A pergunta deve ter uma descrição");
      return;
    }
    if (questionOptions.length === 0 && questionType === 'multiple_choice') {
      setQuestionError("Uma questão de multipla escolha deve ter pelo menos uma alternativa");
      return;
    }

    dispatch(formsActions.addQuestion({ id: currentForm.questions.length, description: questionDescription, type: questionType, options: questionOptions }));
    setQuestionOptions([]);
    setQuestionDescription('');
    setQuestionError(null);
  };

  const addQuestionOptionHandler = () => {
    if (!notEmpty(questionOptionDescription)) {
      setQuestionError("A alternativa deve ter uma descrição");
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

  return (
    <div className={styles.formContainerNewQuestion}>
      <div className={styles.questionType}>
        <input placeholder="Descrição da Pergunta" type="text" value={questionDescription} onChange={changeQuestionDescriptionHandler} />
        <select value={questionType} onChange={changeQuestionType}>
          <option value="text">Texto</option>
          <option value="multiple_choice">Multipla Escolha</option>
        </select>
      </div>
      {questionType === 'multiple_choice' && (
        <>
          <div className={styles.questionOptions}>
            <ul>
              {questionOptions.map((questionOption, index) => {
                return (
                  <li key={`question_option_${index}`}>
                    <input
                      type="checkbox"
                      checked={questionOption.isCorrect}
                      onChange={changeQuestionOptionIsCorrectNotCreated.bind(null, questionOption.id)}
                    />
                    <p>{questionOption.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.multipleChoice}>
            <input
              placeholder="Descrição da alternativa"
              value={questionOptionDescription}
              onChange={changeQuestionOptionDescription}
              type="text"
            />
            <button onClick={addQuestionOptionHandler}>
              <PlusIcon />
            </button>
          </div>
        </>
      )}
      <button onClick={addQuestionHandler}>
        <PlusIcon />
      </button>
      <FieldError>{questionError}</FieldError>
    </div>
  );
};
