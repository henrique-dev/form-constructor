import styles from './NewForm.module.css';
import { NewQuestion } from './NewQuestion';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { FormDescription } from './FormDescription';
import { useNewForm } from './use-new-form';

export const NewForm = () => {
  const { form, changeQuestionOptionIsCorrect, saveFormHandler } = useNewForm();

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <FormDescription />
        {form.questions.length > 0 && (
          <div className={styles.formQuestions}>
            {form.questions.map((question, index) => {
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
                            <input
                              checked={option.isCorrect}
                              onChange={changeQuestionOptionIsCorrect.bind(null, question.id, option.id)}
                              type="checkbox"
                            />
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
        <NewQuestion />
        <button onClick={saveFormHandler}>
          <DocumentPlusIcon />
        </button>
      </div>
    </div>
  );
};
