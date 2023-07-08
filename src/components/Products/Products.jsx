import React from 'react';
import styles from './Products.module.scss';
import Product from './Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  productsSelector,
} from './../../store/slices/productsSlice';
import { brandsSelector, fetchBrands } from './../../store/slices/brandsSlice';
import BrandFilter from './BrandFilter';

const Products = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector(productsSelector);
  const [products, setProducts] = React.useState(allProducts);
  const brands = useSelector(brandsSelector);
  const [searchText, setSearchText] = React.useState('');
  const [activeBrand, setActiveBrand] = React.useState('Все');

  const onChangeSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchText(inputValue);

    if (!inputValue) filtersProductsByBrand(activeBrand);

    setProducts((products) =>
      products.filter((product) => {
        const titleProduct = `${product.type} кроссовки ${product.firm} ${product.model}`;
        return titleProduct.includes(inputValue);
      })
    );
  };

  const filtersProductsByBrand = (name) => {
    if (name === 'Все') setProducts(allProducts);
    else
      setProducts(
        allProducts.filter((product) => product.firm == name.toLowerCase())
      );
  };

  const onClickBrand = (name) => {
    setActiveBrand(name);
    filtersProductsByBrand(name);
  };

  React.useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
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
      <div className={styles.brandsFilters}>
        <BrandFilter
          name={'Все'}
          isActive={activeBrand === 'Все'}
          onClick={onClickBrand}
        />
        {brands.map((brand) => (
          <BrandFilter
            name={brand}
            isActive={activeBrand === brand}
            onClick={onClickBrand}
          />
        ))}
      </div>

      <div className={styles.products}>
        {products.map((product) => (
          <Product key={product.id} {...product} isShowButtons={true} />
        ))}
      </div>
    </div>
  );
};

export default Products;
