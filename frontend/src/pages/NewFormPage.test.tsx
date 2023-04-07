import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../store';

test('renders new form page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const linkElement = screen.getByTestId('new-form');
  expect(linkElement).toBeInTheDocument();

  fireEvent.click(linkElement);

  expect(screen.getByPlaceholderText(/Titulo do Formulario/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Descrição do Formulario/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Descrição da Pergunta/i)).toBeInTheDocument();

  userEvent.selectOptions(screen.getByTestId('select-question-type'), 'multiple_choice');
  expect(screen.getByPlaceholderText(/Descrição da Alternativa/i)).toBeInTheDocument();
});
