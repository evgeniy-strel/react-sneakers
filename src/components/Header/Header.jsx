import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';

const Header = (props) => {
  const sumCart = useSelector((state) => state.cart.totalCount);

  return (
    <header className={styles.test}>
      <div className={styles.headerLeft}>
        <Link to="/">
          <img src="img/logo.svg" alt="logo" width={50} height={50} />
        </Link>
        <div className={styles.text}>
          <p className={styles.title}>REACT SNEAKERS</p>
          <p className={styles.description}> Магазин лучших кроссовок</p>
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.shoppingCart}>
          <img
            src="img/shopping_cart.svg"
            width={20}
            height={19}
            alt="shopping cart"
            onClick={props.openCart}
          />
          <span>{sumCart} руб.</span>
        </div>

        <Link to="/bookmarks">
          <img src="img/like.svg" width={29} height={18} alt="like" />
        </Link>
        <Link to="/purchases">
          <img src="img/user.png" width={20} height={20} alt="user" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
