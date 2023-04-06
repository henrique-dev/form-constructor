import styles from './SelectQuestion.module.css';
import { QuestionType } from '../NewForm/types';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../store';
import { AnswerFormsStateType, answerFormActions } from '../../store/answer-form';
import { ChangeEvent } from 'react';

export const SelectQuestion = (props: { question: QuestionType }) => {
  const { questions } = useSelector<ReducerType>((state) => state.answerForm) as AnswerFormsStateType;
  const dispatch = useDispatch();

  const changeAnswerHandler = (optionId: string, event: ChangeEvent<HTMLInputElement>) => {
    const questionIndex = questions.findIndex((question) => question.id === props.question.id);
    if (questionIndex >= 0) {
      const newQuestions = [...questions];
      const options = newQuestions[questionIndex].options;
      if (options) {
        const optionIndex = options.findIndex((option) => {
          return option.id === optionId;
        });
        if (optionIndex >= 0) {
          const newOptions = options.map((option) => {
            return { ...option, isCorrect: option.id === optionId };
          });
          newQuestions[questionIndex] = { ...newQuestions[questionIndex], options: newOptions };
          dispatch(answerFormActions.setQuestions(newQuestions));
        }
      }
    }
  };

  return (
    <div>
      <p>{props.question.description}</p>
      {props.question.options && (
        <ul>
          {props.question.options.map((option) => {
            return (
              <li className={styles.questionOptionsCreated} key={option.id}>
                <input onChange={changeAnswerHandler.bind(null, option.id)} checked={option.isCorrect} type="checkbox" />
                <p>{option.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
