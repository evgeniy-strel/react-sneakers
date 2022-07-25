import React from 'react';
import styles from './../CartEmptyOrdered.module.scss';
import { Link } from 'react-router-dom';

const CartOrdered = ({ closeCart }) => {
  return (
    <div className={styles.cartEmptyOrdered}>
      <div className="div">
        <img src="img/ordered.svg" alt="box" width={83} height={120} />
        <p className={styles.title} style={{ color: '#87C20A' }}>
          Заказ оформлен!
        </p>
        <p className={styles.description}>Ваш заказ скоро будет передан курьерской доставке</p>

        <Link to="/purchases" className={`${styles.checkOrder} ${styles.button} button go-button`}>
          Посмотреть заказ{' '}
          <img src="img/arrow-left.svg" alt="arrow-right" className={styles.arrowRight} />
        </Link>
        <button className="go-button" onClick={closeCart}>
          <img src="img/arrow-left.svg" alt="arrow-left" className={styles.arrowLeft} /> Вернуться
          назад
        </button>
      </div>
    </div>
  );
};

export default CartOrdered;
