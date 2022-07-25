import React from 'react';
import styles from './Product.module.scss';
import { getFinalPrice } from '../../../UsefulMethods/UsefulMethods';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Product = ({
  id,
  firm,
  model,
  imgUrl,
  type,
  price,
  discount,
  showButtons,
  isAddedToCart,
  addProductToCart,
  removeProductFromCart,
  discountPromocode,
}) => {
  const [isLikedProduct, setIsLikedProduct] = React.useState(false);
  const state = useSelector((state) => state.cart);

  const addProduct = () => {
    addProductToCart(id);
  };

  const removeProduct = () => {
    removeProductFromCart(id);
  };

  const likeProduct = () => {
    setIsLikedProduct(!isLikedProduct);
  };

  return (
    <div className={styles.product}>
      <div className={styles.top}>
        {showButtons && (
          <img
            src={isLikedProduct ? 'img/liked.png' : 'img/like.png'}
            alt="like"
            className={styles.like}
            onClick={likeProduct}
          />
        )}
        <img src={imgUrl} alt="sneakers" width={'100%'} className={styles.imgProduct} />
      </div>
      <p className={styles.title}>
        <span className="capitalize">{type}</span> кроссовки
        <br /> <span className="capitalize">{firm}</span> {model}
      </p>
      <div className={styles.bottom}>
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
                {getFinalPrice(price, discount, discountPromocode)}
              </span>
            ) : (
              ''
            )}{' '}
            руб.
          </p>
        </div>
        {showButtons && (
          <img
            src={isAddedToCart ? 'img/button-added.svg' : 'img/button-add.svg'}
            alt="add"
            onClick={isAddedToCart ? removeProduct : addProduct}
            className={styles.addProductImg}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
