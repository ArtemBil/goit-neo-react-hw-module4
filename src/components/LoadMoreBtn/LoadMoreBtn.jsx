import React from 'react';
import styles from './LoadMoreBtn.module.scss';

const LoadMoreBtn = ({ updatePage }) => {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={updatePage}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
