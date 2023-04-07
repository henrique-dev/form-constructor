import { render, screen } from '@testing-library/react';
import App from './App';

test('renders new form element', () => {
  render(<App />);
  const newFormElement = screen.getByText(/Novo Formulário/i);
  expect(newFormElement).toBeInTheDocument();
});
