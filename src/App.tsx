import React from 'react';
import { useSelector } from 'react-redux';

import { resultsSelector } from './Store/selectors';

import { Search } from './Components/Search';
import { SearchResults } from './Components/SearchResults';

import s from './App.module.scss';

export const App = () => {
  const results = useSelector(resultsSelector);
  console.log('app results: ', results);
  return (
    <div className={s.App}>
      <Search />
      {results && Object.keys(results).length !== 0 ? <SearchResults results={results} /> : null}
    </div>
  );
};
