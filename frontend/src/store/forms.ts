import { createSlice } from '@reduxjs/toolkit';
import { FormType } from '../components/NewForm/types';

export type FormsStateType = {
  forms: FormType[];
  currentForm: FormType;
};

const initialFormsState: FormsStateType = { forms: [], currentForm: { id: '', description: '', questions: [], title: '', errors: {} } };

const formsSlice = createSlice({
  name: 'form',
  initialState: initialFormsState,
  reducers: {
    clearForm(state) {
      state.currentForm = { id: '', description: '', questions: [], title: '', errors: {} }
    },
    updateForm(state, action) {
      state.currentForm = action.payload;
    },
    clearErrors(state) {
      state.currentForm.errors = {};
    },
    addErrors(state, action) {
      state.currentForm.errors = {...state.currentForm.errors, ...action.payload};
    },
    addQuestion(state, action) {
      state.currentForm.questions.push(action.payload);
    },
    updateQuestions(state, action) {
      state.currentForm.questions = action.payload;
    }
  },
});

export const formsActions = formsSlice.actions;
export default formsSlice.reducer;
