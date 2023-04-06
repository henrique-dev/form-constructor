import { configureStore } from '@reduxjs/toolkit';
import formsReducer, { FormsStateType } from './forms';
import answerFormReducer, { AnswerFormsStateType } from './answer-form';

export type ReducerType = {
  forms: FormsStateType;
  answerForm: AnswerFormsStateType;
}

const store = configureStore({
  reducer: {
    forms: formsReducer,
    answerForm: answerFormReducer,
  },
});

export default store;
