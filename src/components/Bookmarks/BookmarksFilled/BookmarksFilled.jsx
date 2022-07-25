import React from 'react';
import stylesPurchases from '../../Purchases/Purchases.module.scss';
import stylesProduct from './../../MainPage/Products/Products.module.scss';
import axios from 'axios';
import Product from './../../MainPage/Products/Product/Product';
import { Link } from 'react-router-dom';

const BookmarksFilled = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3001/products').then(({ data }) => {
      setProducts(data.slice(0, 6));
    });
  }, []);

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
          <p className={stylesPurchases.totalSum}>Всего добавлено: 6 пар</p>
        </div>
      </div>
      <div className={stylesProduct.products}>
        {products.map((product) => (
          <Product
            id={product.id}
            firm={product.firm}
            model={product.model}
            imgUrl={product.imgUrl}
            price={product.price}
            type={product.type}
            discount={product.discount}
            showButtons={true}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarksFilled;
