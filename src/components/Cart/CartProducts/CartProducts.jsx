import React, { useRef } from 'react';
import CartProduct from './CartProduct/CartProduct';
import styles from './CartProducts.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  getCartSelector,
  removeProduct,
  setPromocodes,
} from '../../../store/slices/cartSlice';
import { applyPromocode } from '../../../store//slices/cartSlice';
import { makeOrder } from '../../../store/slices/ordersSlice';

const CartProducts = ({ productsInCart }) => {
  const [promocodes, setPromocodes] = React.useState();

  const { totalCount, totalDiscount, discountPromocode } = useSelector(getCartSelector);
  const promocodeRef = useRef();
  const dispatch = useDispatch();

  const removeProductFromCart = (idProduct) => {
    dispatch(removeProduct(productsInCart.find((product) => product.id === idProduct)));
  };

  const setPromocode = () => {
    const promocodeInput = promocodeRef.current.value.toUpperCase();
    let foundDiscountPromocode =
      promocodes.find((promocode) => promocode.code == promocodeInput)?.discount || 0;

    if (foundDiscountPromocode) {
      dispatch(applyPromocode({ code: promocodeInput, discountPromocode: foundDiscountPromocode }));
      alert(
        `Вы успешно применили промокод ${promocodeInput} на скидку в ${foundDiscountPromocode}%`,
      );
    } else {
      alert(`Промокода ${promocodeInput} не существует`);
    }
  };

  const handleClickOrder = () => {
    dispatch(
      makeOrder({
        products: productsInCart,
        totalCount: totalCount,
        discountPromocode,
      }),
    );
    dispatch(clearCart());
  };

  React.useEffect(() => {
    axios.get('http://localhost:3001/promocodes').then(({ data }) => {
      setPromocodes(data);
    });
  }, []);

  return (
    <div className={styles.cartProductsWrapper}>
      <div className={styles.top}>
        {productsInCart.map((product) => (
          <CartProduct
            {...product}
            removeProductFromCart={removeProductFromCart}
            discountPromocode={discountPromocode}
          />
        ))}
      </div>
      <div className={styles.bottom}>
        <div className={styles.searchWrapper}>
          <div className={`searchWrapper ${styles.search}`}>
            <input type="text" placeholder="Есть промокод?" ref={promocodeRef} />
          </div>
          <button className={styles.button} onClick={setPromocode}>
            Применить
          </button>
        </div>
        <div>
          <p className={styles.discountText}>Скидка: </p>
          <div className={styles.borderBottomDotted}></div>
          <p className={`${styles.discountSum} priceValue`}>{totalDiscount} руб</p>
        </div>
        <div>
          <p className={styles.totalText}>Итого: </p>
          <div className={styles.borderBottomDotted}></div>
          <p className={`${styles.totalSum} priceValue`}>{totalCount} руб</p>
        </div>
        <button className={styles.buy} onClick={handleClickOrder}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
