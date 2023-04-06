import { useDispatch, useSelector } from 'react-redux';
import { FormsStateType } from '../../store/forms';
import styles from './FormDescription.module.css';
import { formsActions } from '../../store/forms';
import React from 'react';
import { FieldError } from './FieldError';

export const FormDescription = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state: { forms: FormsStateType }) => state.forms.currentForm);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      formsActions.updateForm({
        ...currentForm,
        title: event.currentTarget.value,
      })
    );
  };

  const changeDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      formsActions.updateForm({
        ...currentForm,
        description: event.currentTarget.value,
      })
    );
  };

  return (
    <div className={styles.formDescription}>
      <div>
        <input onChange={changeTitleHandler} value={currentForm.title} placeholder="Titulo do Formulario" type="text" />
        <FieldError>{currentForm.errors.title}</FieldError>
      </div>
      <div>
        <input onChange={changeDescriptionHandler} value={currentForm.description} placeholder="Descrição do Formulario" type="text" />
        <FieldError>{currentForm.errors.description}</FieldError>
      </div>
    </div>
  );
};
