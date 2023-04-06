import { Suspense } from 'react';
import { Await, json } from 'react-router-dom';
import { FormType } from '../NewForm/types';
import styles from './Answers.module.css';

export const Answers = (props: { form: FormType }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formDescription}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={loadAnswers(props.form.id)}>
              {(loadedAnswers) => {
                return (
                  <div>
                    <p>Quantidade de Formularios Preenchidos</p>
                    <p>{loadedAnswers.length}</p>
                  </div>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const loadAnswers = async (formId: string) => {
  const response = await fetch(`http://localhost:8080/forms/${formId}/answers`, { headers: { 'Content-Type': 'application/json' } });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch forms.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    return resData.answers;
  }
};
