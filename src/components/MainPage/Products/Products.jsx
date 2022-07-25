import React from 'react';
import styles from './Products.module.scss';
import axios from 'axios';
import Product from './Product/Product';
import { useDispatch } from 'react-redux/es/exports';
import { addProduct } from '../../../store/cartSlice';
import { removeProduct } from '../../../store/cartSlice';
import { useSelector } from 'react-redux';

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const productsInCart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const addProductToCart = (idProduct) => {
    dispatch(addProduct(products.find((product) => product.id === idProduct)));
  };

  const removeProductFromCart = (idProduct) => {
    dispatch(removeProduct(products.find((product) => product.id === idProduct)));
  };

  React.useEffect(() => {
    axios.get('http://localhost:3001/products').then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.productsTop}>
        <p className={styles.title}>Все кроссовки</p>
        <div className="searchWrapper">
          <img src="img/search.svg" alt="search" width={14.25} height={14.25} />
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>

      <div className={styles.products}>
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
            isAddedToCart={productsInCart.find((productInCart) => product.id == productInCart.id)}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
