import { FormType } from '../NewForm/types';
import styles from './Questions.module.css';

export const Questions = (props: { form: FormType }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formDescription}>
          <div>
            <input disabled={true} value={props.form.title} />
          </div>
          <div>
            <input disabled={true} value={props.form.description} />
          </div>
        </div>
        {props.form.questions?.length > 0 && (
          <div className={styles.formQuestions}>
            {props.form.questions?.map((question, index) => {
              return (
                <div key={`question_${index}`}>
                  <p>
                    {question.description} - {question.type}
                  </p>
                  {question.options && (
                    <ul>
                      {question.options.map((option, index) => {
                        return (
                          <li className={styles.questionOptionsCreated} key={`question_option_created_${index}`}>
                            <input readOnly checked={option.isCorrect} type="checkbox" />
                            <p>{option.description}</p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
