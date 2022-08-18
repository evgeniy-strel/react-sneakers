import React from 'react';
import styles from './BookmarksEmpty.module.scss';
import { Link } from 'react-router-dom';

const BookmarksEmpty = (props) => {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.emptyContainer}>
        <p className={styles.emojy}>{props.emojy}</p>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.description}>{props.description}</p>
        <Link to="/" className="go-button button">
          <img src="img/arrow-left.svg" alt="arrow-left" className={styles.arrowLeft} /> Вернуться
          назад
        </Link>
      </div>
    </div>
  );
};

export default BookmarksEmpty;
