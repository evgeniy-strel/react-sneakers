import React from 'react';
import styles from './Cart.module.scss';
import CartProducts from './CartProducts/CartProducts';
import CartEmpty from './CartEmpty/CartEmpty';
import CartOrdered from './CartOrdered/CartOrdered';
import { useSelector } from 'react-redux';
import { getCartSelector, productsInCartSelector } from '../../store/slices/cartSlice';

const Cart = ({ isOpenCart, closeCart }) => {
  const cartRef = React.useRef();
  const productsInCart = useSelector(productsInCartSelector);
  const ordered = useSelector((state) => state.orders.totalCount) > 0;

  React.useEffect(() => {
    if (isOpenCart) {
      cartRef.current.classList.remove(styles.closed);
    } else {
      cartRef.current.classList.add(styles.closed);
    }
  }, [isOpenCart]);

  return (
    <div className={styles.shoppingWrapper}>
      <div className={`${styles.cart} ${styles.closed}`} ref={cartRef}>
        <div className={styles.top}>
          <p className={styles.title}>Корзина</p>
          <img src="img/delete.svg" alt="close" width={32} height={32} onClick={closeCart} />
        </div>
        {ordered ? (
          <CartOrdered closeCart={closeCart} />
        ) : productsInCart.length ? (
          <CartProducts productsInCart={productsInCart} />
        ) : (
          <CartEmpty closeCart={closeCart} />
        )}
      </div>
    </div>
  );
};

export default Cart;
