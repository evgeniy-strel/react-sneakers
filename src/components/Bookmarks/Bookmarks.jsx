import React from 'react';
import BookmarksFilled from './BookmarksFilled/BookmarksFilled';
import BookmarksEmpty from './BookmarksEmpty/BookmarksEmpty';

const Bookmarks = () => {
  return (
    <div className="container">
      {/* <BookmarksFilled /> */}
      <BookmarksEmpty
        emojy="🥺"
        title="Закладок нет :("
        description="Вы ничего не добавляли в закладки"
      />
    </div>
  );
};

export default Bookmarks;
