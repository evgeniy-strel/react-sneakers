import React from 'react';
import styles from './CartProduct.module.scss';
import { discountPromocodeSelector, getItemPrice } from '../../../../store/slices/cartSlice';
import { useSelector } from 'react-redux';

const CartProduct = ({ id, firm, model, imgUrl, type, price, discount, removeProductFromCart }) => {
  const discountPromocode = useSelector(discountPromocodeSelector);
  const removeProduct = () => {
    removeProductFromCart(id);
  };

  return (
    <div className={styles.cartProduct}>
      <div className={styles.imgWrapperCart}>
        <img src={imgUrl} alt={`${firm} ${model}`} width="100%" />
      </div>
      <div className={styles.text}>
        <span className="capitalize">{type}</span> кроссовки
        <br /> <span className="capitalize">{firm}</span> {model}
        <div className="styles.priceWrapper">
          <p className="styles.priceText">Цена:</p>
          <p className="priceValue">
            <span
              className={`originalPrice ${
                discount || discountPromocode ? 'line-through fw-400' : ''
              }`}>
              {price}
            </span>
            {discount || discountPromocode ? (
              <span className="discountPrice">
                {getItemPrice({ price, discount }, discountPromocode)}
              </span>
            ) : (
              ''
            )}{' '}
            руб.
          </p>
        </div>
      </div>
      <img
        src="img/delete.svg"
        alt="delete"
        width={32}
        height={32}
        className={styles.deleteProduct}
        onClick={removeProduct}
      />
    </div>
  );
};

export default CartProduct;
