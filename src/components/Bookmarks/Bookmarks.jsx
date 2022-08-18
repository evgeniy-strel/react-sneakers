import React from 'react';
import BookmarksFilled from './BookmarksFilled/BookmarksFilled';
import BookmarksEmpty from './BookmarksEmpty/BookmarksEmpty';
import { useSelector } from 'react-redux';

const Bookmarks = () => {
  const productsInBookmarks = useSelector((state) => state.bookmarks.products);
  console.log('rerender bookmarks');

  return (
    <div className="container">
      {productsInBookmarks.length ? (
        <BookmarksFilled products={productsInBookmarks} />
      ) : (
        <BookmarksEmpty
          emojy="🥺"
          title="Закладок нет :("
          description="Вы ничего не добавляли в закладки"
        />
      )}
    </div>
  );
};

export default Bookmarks;
