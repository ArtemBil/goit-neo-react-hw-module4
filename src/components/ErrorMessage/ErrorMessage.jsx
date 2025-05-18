import React from 'react';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = () => {
  return (
    <p className={styles.container}>Something went wrong with the request</p>
  );
};

export default ErrorMessage;
