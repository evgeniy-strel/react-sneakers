import React from 'react';
import PurchasesFilled from './PurchasesFilled/PurchasesFilled';
import BookmarksEmpty from './../Bookmarks/BookmarksEmpty/BookmarksEmpty';
import { useSelector } from 'react-redux';

const Purchases = () => {
  const orders = useSelector((state) => state.orders);
  return (
    <div className="container">
      {orders.totalCount > 0 ? (
        <PurchasesFilled
          products={orders.products}
          totalCount={orders.totalCount}
          discountPromocode={orders.discountPromocode}
        />
      ) : (
        <BookmarksEmpty
          emojy="😔"
          title="У вас нет заказов"
          description="Вы упускаете много качественной обуви!"
        />
      )}
    </div>
  );
};

export default Purchases;
