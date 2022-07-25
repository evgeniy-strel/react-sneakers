import React from 'react';
import styles from './../CartEmptyOrdered.module.scss';

const CartEmpty = ({ closeCart }) => {
  return (
    <div className={styles.cartEmptyOrdered}>
      <div className="div">
        <img src="img/box.svg" alt="box" width={120} height={120} />
        <p className={styles.title}>Корзина пустая</p>
        <p className={styles.description}>
          Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
        </p>
        <button className={styles.goBack} onClick={closeCart}>
          <img src="img/arrow-left.svg" alt="arrow-left" className={styles.arrowLeft} /> Вернуться
          назад
        </button>
      </div>
    </div>
  );
};

export default CartEmpty;
