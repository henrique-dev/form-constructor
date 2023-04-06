import styles from './Answers.module.css';
import { FormType } from '../NewForm/types';
import { SelectQuestion } from './SelectQuestion';
import { TextQuestion } from './TextQuestion';
import { ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../store';
import { AnswerFormsStateType, answerFormActions } from '../../store/answer-form';
import { DocumentPlusIcon } from '@heroicons/react/24/solid';

export const Answers = (props: { form: FormType }) => {
  const { email, form, questions } = useSelector<ReducerType>((state) => state.answerForm) as AnswerFormsStateType;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(answerFormActions.setForm(props.form));
    dispatch(
      answerFormActions.setQuestions(
        props.form.questions.map((question) => {
          return {
            ...question,
            answer: '',
            options: question.options?.map((option) => {
              return { ...option, isCorrect: false };
            }),
          };
        })
      )
    );
  }, [props.form, dispatch]);

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(answerFormActions.changeEmail(event.target.value));
  };

  const sendFormQuestionsHandler = () => {
    fetch(`http://localhost:8080/forms/${form.id}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formId: form.id,
        email: email,
        questions: questions,
      }),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formDescription}>
          <div>
            <input disabled={true} value={form.title} />
          </div>
          <div>
            <input disabled={true} value={form.description} />
          </div>
        </div>
        <div className={styles.formEmail}>
          <div>
            <input onChange={changeEmailHandler} value={email} placeholder="Informe seu Email" />
          </div>
        </div>
        <div className={styles.formQuestions}>
          {questions?.map((question) =>
            question.type === 'text' ? (
              <TextQuestion key={question.id} question={question} />
            ) : (
              <SelectQuestion key={question.id} question={question} />
            )
          )}
        </div>
        <button onClick={sendFormQuestionsHandler}>
          <DocumentPlusIcon />
        </button>
      </div>
    </div>
  );
};
