import { Await, NavLink, json } from 'react-router-dom';
import styles from './Home.module.css';
import { PlusIcon, DocumentIcon } from '@heroicons/react/24/solid';
import { Suspense } from 'react';
import { FormType } from '../NewForm/types';

export const Home = () => {
  return (
    <div>
      <div className={styles.formTypes}>
        <div>
          <p>Novo Formulário</p>
        </div>
        <ul className={styles.list}>
          <li>
            <NavLink data-testid='new-form' to="/forms/new" className={({ isActive }) => (isActive ? styles.active : undefined)} end>
              <div className={styles.newForm}>
                <PlusIcon />
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.existentForms}>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <Await resolve={loadForms()}>
            {(loadedForms) => {
              return (
                <>
                  <div>{loadedForms.length === 0 ? <p>Voce não tem nenhum formulario</p> : <p>Seus Formulários</p>}</div>
                  <ul>
                    {(loadedForms as FormType[]).map((form) => (
                      <li>
                        <NavLink to={`/forms/${form.id}`} end>
                          <div className={styles.form}>
                            <DocumentIcon />
                            <div>
                              <p>{form.title}</p>
                              <p>{form.description}</p>
                            </div>
                          </div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

const loadForms = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forms`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch forms.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    return resData.forms;
  }
};
