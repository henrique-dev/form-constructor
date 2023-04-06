import { createSlice } from '@reduxjs/toolkit';
import { FormType, QuestionType } from '../components/NewForm/types';

export type AnswerFormsStateType = { form: FormType; email: string; questions: QuestionType[] };

const initialAnswerFormsState: AnswerFormsStateType = {
  email: '',
  form: {
    id: '',
    description: '',
    title: '',
    questions: [],
    errors: {},
  },
  questions: [],
};

const answerFormSlice = createSlice({
  name: 'answer-form',
  initialState: initialAnswerFormsState,
  reducers: {
    setForm(state, action) {
      state.form = action.payload;
    },
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    changeEmail(state, action) {
      state.email = action.payload
    }
  },
});

export const answerFormActions = answerFormSlice.actions;
export default answerFormSlice.reducer;
