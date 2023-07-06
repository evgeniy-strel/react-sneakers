import React from 'react';
import styles from './Products.module.scss';
import Product from './Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, productsSelector } from './../../store/slices/productsSlice';

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector(productsSelector);
  const [searchText, setSearchText] = React.useState('');

  const getSearchedProducts = () => {
    return products.filter((product) => {
      const titleProduct =
        `${product.type} кроссовки ${product.firm} ${product.model}`.toLowerCase();
      return titleProduct.includes(searchText.toLowerCase());
    });
  };

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.productsTop}>
        <p className={styles.title}>Все кроссовки</p>
        <div className="searchWrapper">
          <img src="img/search.svg" alt="search" width={14.25} height={14.25} />
          <input type="text" placeholder="Поиск..." onChange={onChangeSearch} />
        </div>
      </div>

      <div className={styles.products}>
        {getSearchedProducts().map((product) => (
          <Product key={product.id} {...product} isShowButtons={true} />
        ))}
      </div>
    </div>
  );
};

export default Products;
