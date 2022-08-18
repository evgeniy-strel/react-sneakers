import React from 'react';
import stylesPurchases from '../../Purchases/Purchases.module.scss';
import stylesProduct from './../../MainPage/Products/Products.module.scss';
import Products from '../../MainPage/Products/Products';
import { Link } from 'react-router-dom';

const BookmarksFilled = ({ products }) => {
  const getWordDeclension = () => {
    const number = products.length;
    if (
      (5 <= number && number <= 20) ||
      (5 <= number % 10 && number % 10 <= 9) ||
      number % 10 == 0
    ) {
      return 'пар';
    } else if (number % 10 == 1) {
      return 'пара';
    }
    return 'пары';
  };

  return (
    <div className={stylesProduct.productsWrapper}>
      <div className={stylesPurchases.top}>
        <div className={stylesPurchases.left}>
          <Link to="/">
            <img src="img/GoBackBtn.svg" alt="go back" />
          </Link>
          <p className={stylesProduct.title} style={{ lineHeight: 0 }}>
            Мои закладки
          </p>
        </div>
        <div className={stylesPurchases.right}>
          <img src="img/bookmarks.png" alt="bookmarks" width={30} />
          <p className={stylesPurchases.totalSum}>
            Всего добавлено: {products.length} {getWordDeclension()}
          </p>
        </div>
      </div>
      <div className={stylesProduct.products}>
        <Products isProductsBookmarks={true} />
      </div>
    </div>
  );
};

export default BookmarksFilled;
