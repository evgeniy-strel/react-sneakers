import './styles.scss';
import React from 'react';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import styles from './components/Cart/Cart.module.scss';
import { Routes, Route } from 'react-router-dom';
import Purchases from './components/Purchases/Purchases';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Main from './pages/Main/Main';

function App(props) {
  const [isOpenCart, setIsOpencart] = React.useState(false);

  return (
    <>
      <div className="wrapper">
        <Header openCart={() => setIsOpencart(true)} />
        <Cart isOpenCart={isOpenCart} closeCart={() => setIsOpencart(false)} />
        {isOpenCart && (
          <div className={styles.backgroundInner} onClick={() => setIsOpencart(false)}></div>
        )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
