import { json, LoaderFunction, defer, useLoaderData } from 'react-router-dom';
import { Answers } from '../components/Answers';
import { FormType } from '../components/NewForm/types';

export const AnswersPage = () => {
  const form = useLoaderData() as FormType;
  return <Answers form={form} />;
};

const loadForm = async (formId: string) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forms/${formId}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.form;
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const formId = params.formId as string;

  return defer(await loadForm(formId));
};
