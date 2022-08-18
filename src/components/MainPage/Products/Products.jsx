import React from 'react';
import styles from './Products.module.scss';
import axios from 'axios';
import Product from './Product/Product';
import { useDispatch } from 'react-redux/es/exports';
import { addProduct as addProductToCartStore } from '../../../store/cartSlice';
import { removeProduct as removeProductFromCartStore } from '../../../store/cartSlice';
import { addProduct as addProductToBookmarksStore } from '../../../store/bookmarksSlice';
import { removeProduct as removeProductFromBookmarksStore } from '../../../store/bookmarksSlice';
import { useSelector } from 'react-redux';
import { searchProductsByText } from '../../UsefulMethods/UsefulMethods';

const Products = (props) => {
  const [products, setProducts] = React.useState([]);
  const [productsSearch, setProductsSearch] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const productsInCart = useSelector((state) => state.cart.products);
  const productsInBookmarks = useSelector((state) => state.bookmarks.products);
  const dispatch = useDispatch();

  const addProductToCart = (idProduct) => {
    dispatch(addProductToCartStore(products.find((product) => product.id === idProduct)));
  };

  const removeProductFromCart = (idProduct) => {
    dispatch(removeProductFromCartStore(products.find((product) => product.id === idProduct)));
  };

  const addProductToBookmarks = (idProduct) => {
    dispatch(addProductToBookmarksStore(products.find((product) => product.id === idProduct)));
  };

  const removeProductFromBookmarks = (idProduct) => {
    dispatch(removeProductFromBookmarksStore(products.find((product) => product.id === idProduct)));
  };

  const loadProducts = () => {
    if (props.isProductsBookmarks) {
      setProducts(productsInBookmarks);
    } else {
      axios.get('http://localhost:3001/products').then(({ data }) => {
        setProducts(data);
      });
    }
  };

  console.log(productsSearch);

  const getProductsShown = () => {
    const productsShown = productsSearch.length || searchText ? productsSearch : products;
    return productsShown.map((product) => (
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
        isAddedToBookmarks={productsInBookmarks.find(
          (productInBookmarks) => product.id == productInBookmarks.id,
        )}
        addProductToBookmarks={addProductToBookmarks}
        removeProductFromBookmarks={removeProductFromBookmarks}
      />
    ));
  };

  const handleSearch = (e) => {
    if (e.target.value) {
      setProductsSearch(searchProductsByText(products, e.target.value));
    } else {
      setProductsSearch([]);
    }
    setSearchText(e.target.value);
  };

  React.useEffect(() => {
    loadProducts();
  }, [productsInBookmarks]);

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.productsTop}>
        <p className={styles.title}>Все кроссовки</p>
        <div className="searchWrapper">
          <img src="img/search.svg" alt="search" width={14.25} height={14.25} />
          <input type="text" placeholder="Поиск..." onChange={handleSearch} />
        </div>
      </div>

      <div className={styles.products}>{getProductsShown()}</div>
    </div>
  );
};

export default Products;
