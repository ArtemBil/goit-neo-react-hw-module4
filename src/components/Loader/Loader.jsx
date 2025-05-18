import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.container}>
      <ClipLoader size={150} color={'#123abc'} />
    </div>
  );
};

export default Loader;
