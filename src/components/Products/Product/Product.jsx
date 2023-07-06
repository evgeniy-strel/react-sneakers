import React from 'react';
import styles from './Product.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  discountPromocodeSelector,
  getItemPrice,
  productsInCartSelector,
  addProduct as addProductToCart,
  removeProduct as removeProductFromCart,
} from '../../../store/slices/cartSlice';
import {
  addProduct as addProductToBookmarks,
  removeProduct as removeProductFromBookmarks,
  productsInBookmarksSelector,
} from './../../../store/slices/bookmarksSlice';

import { productsSelector } from '../../../store/slices/productsSlice';

const Product = ({ id, firm, model, imgUrl, type, price, discount, isShowButtons }) => {
  const dispatch = useDispatch();

  const products = useSelector(productsSelector);
  const productsInCart = useSelector(productsInCartSelector);
  const productsInBookmarks = useSelector(productsInBookmarksSelector);
  const discountPromocode = useSelector(discountPromocodeSelector);

  const findProductById = (idProduct) => products.find((product) => product.id === idProduct);

  const addProduct = () => {
    if (isAddedToCart) {
      dispatch(removeProductFromCart(findProductById(id)));
    } else {
      dispatch(addProductToCart(findProductById(id)));
    }
  };

  const likeProduct = () => {
    if (isAddedToBookmarks) {
      dispatch(removeProductFromBookmarks(findProductById(id)));
    } else {
      dispatch(addProductToBookmarks(findProductById(id)));
    }
  };

  const isAddedToCart = Boolean(productsInCart.find((productInCart) => productInCart.id == id));
  const isAddedToBookmarks = Boolean(
    productsInBookmarks.find((productInBookmarks) => productInBookmarks.id == id),
  );

  return (
    <div className={styles.product}>
      <div className={styles.top}>
        {isShowButtons && (
          <img
            src={isAddedToBookmarks ? 'img/liked.png' : 'img/like.png'}
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
            <span className={`originalPrice ${discount ? 'line-through fw-400' : ''}`}>
              {price}
            </span>
            {discount ? (
              <span className="discountPrice">
                {getItemPrice({ price, discount }, discountPromocode)}
              </span>
            ) : (
              ''
            )}{' '}
            руб.
          </p>
        </div>
        {isShowButtons && (
          <img
            src={isAddedToCart ? 'img/button-added.svg' : 'img/button-add.svg'}
            alt="add"
            onClick={addProduct}
            className={styles.addProductImg}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
