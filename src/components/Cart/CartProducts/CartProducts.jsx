import React, { useRef } from 'react';
import CartProduct from './CartProduct/CartProduct';
import styles from './CartProducts.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { getAllSumOfDiscount } from '../../UsefulMethods/UsefulMethods';
import { removeProduct } from '../../../store/cartSlice';
import { applyPromocode } from '../../../store/cartSlice';
import { makeOrder } from '../../../store/ordersSlice';

const CartProducts = ({ cartState, productsInCart }) => {
  const [promocodes, setPromocodes] = React.useState();
  const [discountPromocode, setDiscountPromocode] = React.useState();
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
      setDiscountPromocode(foundDiscountPromocode);
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
        totalCount: cartState.totalCount,
        discountPromocode: discountPromocode,
      }),
    );
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
            id={product.id}
            firm={product.firm}
            model={product.model}
            imgUrl={product.imgUrl}
            type={product.type}
            price={product.price}
            discount={product.discount}
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
          <p className={`${styles.discountSum} priceValue`}>
            {getAllSumOfDiscount(cartState.products, discountPromocode)} руб
          </p>
        </div>
        <div>
          <p className={styles.totalText}>Итого: </p>
          <div className={styles.borderBottomDotted}></div>
          <p className={`${styles.totalSum} priceValue`}>{cartState.totalCount} руб</p>
        </div>
        <button className={styles.buy} onClick={handleClickOrder}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
