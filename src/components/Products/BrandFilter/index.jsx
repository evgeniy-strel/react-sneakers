import React from 'react';
import styles from './index.module.scss';

const BrandFilter = ({ name, onClick, isActive }) => {
  const handleClick = () => {
    onClick(name);
  };

  return (
    <div
      className={`${styles.brand} ${isActive ? styles.active : ''}`}
      onClick={handleClick}>
      {name}
    </div>
  );
};

export default BrandFilter;
