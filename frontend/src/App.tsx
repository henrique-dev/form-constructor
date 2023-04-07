import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './pages/RootLayout';
import { NewFormPage } from './pages/NewFormPage';
import { HomePage } from './pages/HomePage';
import { FormPage, loader as formLoader } from './pages/FormPage';
import { AnswersPage } from './pages/AnswersPage';
import { SuccessPage } from './pages/SuccessPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/forms',
        children: [
          {
            index: true,
          },
          {
            path: 'new',
            element: <NewFormPage />,
          },
          {
            path: 'success',
            element: <SuccessPage />,
          },
          {
            path: ':formId',
            children: [
              {
                index: true,
                element: <FormPage />,
                loader: formLoader,
              },
              {
                path: 'answers',
                element: <AnswersPage />,
                loader: formLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
