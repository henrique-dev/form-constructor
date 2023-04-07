import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormsStateType, formsActions } from '../../store/forms';
import { notEmpty } from './validations';

export const useNewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentForm = useSelector((state: { forms: FormsStateType }) => state.forms.currentForm);

  const changeQuestionOptionIsCorrect = (questionId: string, questionOptionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...currentForm.questions];
    const questionToUpdateIndex = newQuestions.findIndex((question) => question.id === questionId);
    if (questionToUpdateIndex >= 0) {
      const questionToUpdate = { ...newQuestions[questionToUpdateIndex] };
      questionToUpdate.options = questionToUpdate.options?.map((questOption) => {
        return {
          ...questOption,
          isCorrect: questOption.id === questionOptionId,
        };
      });
      newQuestions[questionToUpdateIndex] = questionToUpdate;
    }
    dispatch(formsActions.updateQuestions(newQuestions));
  };

  const saveFormHandler = async () => {
    dispatch(formsActions.clearErrors());

    if (!notEmpty(currentForm.title)) {
      dispatch(formsActions.addErrors({ title: 'Esse campo não pode ficar em branco' }));
      return;
    }

    if (!notEmpty(currentForm.description)) {
      dispatch(formsActions.addErrors({ description: 'Esse campo não pode ficar em branco' }));
      return;
    }

    if (currentForm.questions.length === 0) {
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/forms`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(currentForm),
    }).then((response) => {
      if (response.ok) {
        dispatch(formsActions.clearForm());
        navigate('/');
      }
    });
  };

  return {
    form: currentForm,
    changeQuestionOptionIsCorrect: changeQuestionOptionIsCorrect,
    saveFormHandler: saveFormHandler,
  };
};
