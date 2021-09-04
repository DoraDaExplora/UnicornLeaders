import React from 'react';

import s from './SearchResults.module.scss';

export const SearchResults = (results: any) => {
  console.log('results in searchResults: ', results);
  return (
    <div className={s.SearchResults}>
      <div className={s.SearchResult}>
        <h1>keekle</h1>
      </div>
      <div className={s.SearchResult}>
        <h1>keekle</h1>
      </div>
      <div className={s.SearchResult}>
        <h1>keekle</h1>
      </div>
      <div className={s.SearchResult}>
        <h1>keekle</h1>
      </div>
      <div className={s.SearchResult}>
        <h1>keekle</h1>
      </div>
      <div className={s.SearchResult}>
        <h1>keekle</h1>
      </div>
    </div>
  );
};
