import React from 'react';
import stylesProduct from '../../Products/Products.module.scss';
import styles from './../Purchases.module.scss';
import axios from 'axios';
import Product from '../../Products/Product/Product';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PurchasesFilled = ({ products, totalCount, discountPromocode }) => {
  // product.discount + discountPromocode - (product.discount * discountPromocode) / 100
  return (
    <div>
      <div className={stylesProduct.productsWrapper}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Link to="/">
              <img src="img/GoBackBtn.svg" alt="go back" />
            </Link>
            <p className={stylesProduct.title} style={{ lineHeight: 0 }}>
              Мои покупки
            </p>
          </div>
          <div className={styles.right}>
            <img src="img/money.png" alt="money" width={30} />
            <p className={styles.totalSum}>Общая сумма: {totalCount} руб</p>
          </div>
        </div>
        <div className={stylesProduct.products}>
          {products.map((product) => (
            <Product
              id={product.id}
              firm={product.firm}
              model={product.model}
              discount={product.discount}
              imgUrl={product.imgUrl}
              price={product.price}
              type={product.type}
              discountPromocode={discountPromocode}
              isShowButtons={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchasesFilled;
