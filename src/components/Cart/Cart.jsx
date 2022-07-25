import React from 'react';
import styles from './Cart.module.scss';
import CartProducts from './CartProducts/CartProducts';
import CartEmpty from './CartEmpty/CartEmpty';
import CartOrdered from './CartOrdered/CartOrdered';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const handleClose = () => {
    props.closeCart();
    cartRef.current.classList.add(styles.closed);
  };

  const cartRef = React.useRef();
  const [productsInCart, setProductsInCart] = React.useState([]);
  const cartState = useSelector((state) => state.cart);
  const ordered = useSelector((state) => state.orders.totalCount) > 0;

  React.useEffect(() => {
    setProductsInCart(cartState.products);
  }, [cartState]);

  React.useEffect(() => {
    if (props.isOpenCart) {
      cartRef.current.classList.remove(styles.closed);
    } else {
      cartRef.current.classList.add(styles.closed);
    }
  }, [props.isOpenCart]);

  return (
    <div className={styles.shoppingWrapper}>
      <div className={`${styles.cart} ${styles.closed}`} ref={cartRef}>
        <div className={styles.top}>
          <p className={styles.title}>Корзина</p>
          <img src="img/delete.svg" alt="close" width={32} height={32} onClick={handleClose} />
        </div>
        {ordered ? (
          <CartOrdered closeCart={handleClose} />
        ) : productsInCart.length ? (
          <CartProducts cartState={cartState} productsInCart={productsInCart} />
        ) : (
          <CartEmpty closeCart={handleClose} />
        )}
      </div>
    </div>
  );
};

export default Cart;
