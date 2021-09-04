import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pendingSelector } from '../../Store/selectors';

import { Button } from '../Button';

import s from './Search.module.scss';
import { loadResults } from '../../Store/actions';

export const Search = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(pendingSelector);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setSearchValue(target.value);
  };

  const handleSearch = () => {
    const searchData = {};
    dispatch(loadResults(searchData));
  };

  return (
    <div className={s.Search}>
      <div className={s.SearchContainer}>
        <h1 className={s.SearchTitle}>Поиск подходящих поставщиков</h1>
        <div className={s.SearchInputContainer}>
          <input
            className={s.SearchInput}
            placeholder="Что закупаем?"
            value={searchValue}
            onChange={handleSearchInput}
          />
          <Button className={s.SearchButton} disabled={!searchValue} onClick={handleSearch}>
            Найти
          </Button>
        </div>
        {isLoading && <h2>Ищем поставщиков</h2>}
      </div>
    </div>
  );
};
