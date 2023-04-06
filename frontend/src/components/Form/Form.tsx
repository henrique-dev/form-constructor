import styles from './Form.module.css';
import { FormType } from '../NewForm/types';
import { classNames } from '../../utils/class-names';
import { Questions } from './Questions';
import { useState } from 'react';
import { Answers } from './Answers';

export const Form = (props: { form: FormType }) => {
  const [currentTab, setCurrentTab] = useState<'questions' | 'answers'>('questions');

  return (
    <div>
      <div className={styles.tabContainer}>
        <div
          onClick={() => setCurrentTab('questions')}
          className={classNames(styles.tabButton, currentTab === 'questions' ? styles.active : '')}
        >
          Perguntas
        </div>
        <div
          onClick={() => setCurrentTab('answers')}
          className={classNames(styles.tabButton, currentTab === 'answers' ? styles.active : '')}
        >
          Respostas
        </div>
      </div>
      {currentTab === 'questions' && <Questions form={props.form} />}
      {currentTab === 'answers' && <Answers form={props.form} />}
    </div>
  );
};
