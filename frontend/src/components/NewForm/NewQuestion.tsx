import styles from './NewQuestion.module.css';
import { FieldError } from './FieldError';
import { useNewQuestion } from './use-new-question';

export const NewQuestion = () => {
  const {
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
  } = useNewQuestion();

  return (
    <div className={styles.formContainerNewQuestion}>
      <div className={styles.questionType}>
        <input placeholder="Descrição da Pergunta" type="text" value={questionDescription} onChange={changeQuestionDescriptionHandler} />
        <select data-testid="select-question-type" value={questionType} onChange={changeQuestionType}>
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
              Adicionar Alternativa
            </button>
          </div>
        </>
      )}
      <button onClick={addQuestionHandler}>
        Adicionar Pergunta
      </button>
      <FieldError>{questionError}</FieldError>
    </div>
  );
};
