import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { CircularProgress } from '@material-ui/core';

import { pendingSelector } from '../../Store/selectors';
import { loadResults } from '../../Store/actions';

import { Button } from '../Button';

import s from './Search.module.scss';
import a from '../../Styles/Animations.module.scss';

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
        <CSSTransition in={isLoading} timeout={200} mountOnEnter unmountOnExit classNames={{ ...a }}>
          <div className={s.LoadingContainer}>
            <h3>Ищем поставщиков...</h3>
            <CircularProgress classes={{ root: s.LoadingPreloader }} />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
