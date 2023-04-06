import styles from './TextQuestion.module.css';
import { QuestionType } from '../NewForm/types';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../store';
import { AnswerFormsStateType, answerFormActions } from '../../store/answer-form';
import { ChangeEvent } from 'react';

export const TextQuestion = (props: { question: QuestionType }) => {
  const { questions } = useSelector<ReducerType>((state) => state.answerForm) as AnswerFormsStateType;
  const dispatch = useDispatch();

  const changeAnswerHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const questionIndex = questions.findIndex((question) => question.id === props.question.id);
    if (questionIndex >= 0) {
      const newQuestions = [...questions];
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], answer: event.currentTarget.value };
      dispatch(answerFormActions.setQuestions(newQuestions));
    }
  };

  return (
    <div className={styles.textQuestion}>
      <p>{props.question.description}</p>
      <textarea onChange={changeAnswerHandler} value={props.question.answer} rows={5}></textarea>
    </div>
  );
};
