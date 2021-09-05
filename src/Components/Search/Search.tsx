import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { CircularProgress } from '@material-ui/core';

import { pendingSelector, statusSelector } from '../../Store/selectors';
import { startSearch, fetchTaskStatus, setSearchResults } from '../../Store/actions';

import { Button } from '../Button';

import s from './Search.module.scss';
import a from '../../Styles/Animations.module.scss';

export const Search = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(pendingSelector);
  const taskStatus = useSelector(statusSelector);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [intervalId, setIntervalId] = React.useState<any>();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setSearchValue(target.value);
  };

  const stopInterval = (interval: any) => {
    clearInterval(interval);
  };

  const handleSearch = () => {
    const searchData = {
      keywords: [searchValue],
      max_requests: 1,
    };
    dispatch(startSearch(searchData));

    setIntervalId(
      setInterval(() => {
        dispatch(fetchTaskStatus());
      }, 2000),
    );
  };

  React.useEffect(() => {
    console.log('taskStatus: ', taskStatus);
    if (taskStatus.length) {
      console.log('task done');
      stopInterval(intervalId);
      dispatch(setSearchResults());
    }
  }, [taskStatus]);

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
