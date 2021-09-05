import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { CircularProgress, InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';

import { pendingSelector, statusSelector } from '../../Store/selectors';
import { startSearch, fetchTaskStatus, setSearchResults } from '../../Store/actions';

import { Button } from '../Button';

import s from './Search.module.scss';
import a from '../../Styles/Animations.module.scss';

const INITIAL_SEARCH_DATA = {
  keywords: [],
  region: null, //done
  okpd: '', //done
  status: -1, //done
  placing: [undefined], //done
  etp: [-1], //done
  min_price: 0, //done
  max_price: 1, //done
  fz: -1, //done
  max_requests: 1,
};

// Статус закупки
const STATUSES = [
  { label: 'Любой', value: -1 },
  { label: 'Подача заявок', value: 1 },
  { label: 'Работа комиссии', value: 2 },
  { label: 'Закупка завершена', value: 3 },
  { label: 'Закупка отменена', value: 4 },
];

// По какому закону
const LAWS = [
  { label: 'Любой', value: -1 },
  { label: '44-ФЗ', value: 44 },
  { label: '223-ФЗ', value: 223 },
];

// Площадка проведения торгов
const ETPS = [
  { label: 'Любая', value: -1 },
  { label: 'Сбербанк-АСТ', value: 1 },
  { label: 'РТС-тендер', value: 2 },
  { label: 'ЕЭТП', value: 3 },
  { label: 'ZakazRF (АГЗРТ)', value: 4 },
  { label: 'ЭТП НЭП (ММВБ)', value: 5 },
  { label: 'РАД (Lot-Online)', value: 6 },
  { label: 'B2B-Center', value: 7 },
  { label: 'Фабрикант', value: 8 },
  { label: 'ЭТП ГПБ', value: 9 },
  { label: 'OTC.RU', value: 10 },
  { label: 'ТЭК-Торг', value: 11 },
  { label: 'ЭТПРФ', value: 12 },
  { label: 'Газнефтеторг', value: 13 },
  { label: 'Тендер.Про', value: 14 },
  { label: 'Аукционный Конкурсный Дом', value: 15 },
  { label: 'ПолюсГолд', value: 16 },
  { label: 'Другие площадки', value: 99 },
];

// Способ отбора победителя
const PLACINGS = [
  { label: 'Любой', value: undefined },
  { label: 'Электронный аукцион', value: 1 },
  { label: 'Запрос котировок', value: 2 },
  { label: 'Конкурс', value: 3 },
  { label: 'Закупка у единственного поставщика', value: 4 },
  { label: 'Запрос предложений', value: 5 },
  { label: 'Другие способы', value: 99 },
];

export const Search = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(pendingSelector);
  const taskStatus = useSelector(statusSelector);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [intervalId, setIntervalId] = React.useState<any>();
  const [searchData, setSearchData] = React.useState<any>(INITIAL_SEARCH_DATA);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setSearchValue(target.value);
    const normalizedValue = target.value.split(' ');
    handleChangeFilter('keywords', normalizedValue);
  };

  const stopInterval = (interval: any) => {
    clearInterval(interval);
  };

  const handleSearch = () => {
    dispatch(startSearch(searchData));

    setIntervalId(
      setInterval(() => {
        dispatch(fetchTaskStatus());
      }, 2000),
    );
  };

  const handleChangeFilter = (name: string, value: any) => {
    const newSearchData = { ...searchData, [name]: value };
    console.log(newSearchData);
    setSearchData(newSearchData);
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
          <FormControl>
            <InputLabel className={s.SearchFilterLabel}>Введите запрос</InputLabel>
            <Input
              className={s.SearchInput}
              classes={{ root: s.SearchInputOverride, underline: s.SearchInputBorderOverride }}
              value={searchData.searchValue}
              onChange={handleSearchInput}
            />
          </FormControl>
          <div className={s.SearchButtons}>
            <Button className={s.SearchButton} disabled={!searchValue} onClick={handleSearch}>
              Найти
            </Button>
            <Button className={s.FilterButton} onClick={() => setShowFilters(!showFilters)}>
              Расширенный фильтр
            </Button>
          </div>
        </div>
        <CSSTransition in={showFilters} timeout={200} mountOnEnter unmountOnExit classNames={{ ...a }}>
          <div className={s.SearchFilters}>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>Номер региона</InputLabel>
              <Input
                className={s.SearchFilterInput}
                classes={{ root: s.SearchInputOverride, underline: s.SearchInputBorderOverride }}
                value={searchData.region}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter('region', [e.target.value])}
              />
            </FormControl>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>Код по ОКПД2</InputLabel>
              <Input
                className={s.SearchFilterInput}
                classes={{ root: s.SearchInputOverride, underline: s.SearchInputBorderOverride }}
                value={searchData.okpd}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter('okpd', e.target.value)}
              />
            </FormControl>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>Минимальная цена</InputLabel>
              <Input
                className={s.SearchFilterInput}
                classes={{ root: s.SearchInputOverride, underline: s.SearchInputBorderOverride }}
                placeholder="Минимальная цена"
                value={searchData.min_price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter('min_price', e.target.value)}
              />
            </FormControl>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>Максимальная цена</InputLabel>
              <Input
                className={s.SearchFilterInput}
                classes={{ root: s.SearchInputOverride, underline: s.SearchInputBorderOverride }}
                placeholder="Максимальная цена"
                value={searchData.max_price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilter('max_price', e.target.value)}
              />
            </FormControl>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>Закон</InputLabel>
              <Select
                value={searchData.fz}
                onChange={(e: any) => handleChangeFilter('fz', e.target.value)}
                classes={{ root: s.SearchSelectOverride }}
              >
                {LAWS.map(law => (
                  <option key={`${law.value}_law`} value={law.value}>
                    {law.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>Статус закупки</InputLabel>
              <Select
                value={searchData.status}
                onChange={(e: any) => handleChangeFilter('status', e.target.value)}
                classes={{ root: s.SearchSelectOverride }}
              >
                {STATUSES.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>Отбор победителя</InputLabel>
              <Select
                value={searchData.placing}
                onChange={(e: any) => handleChangeFilter('placing', e.target.value)}
                multiple
                classes={{ root: s.SearchSelectOverride }}
              >
                {PLACINGS.map(placing => (
                  <option key={placing.value} value={placing.value}>
                    {placing.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={s.formControl}>
              <InputLabel className={s.SearchFilterLabel}>ЭТП</InputLabel>
              <Select
                value={searchData.etp}
                onChange={(e: any) => handleChangeFilter('etp', e.target.value)}
                multiple
                classes={{ root: s.SearchSelectOverride }}
              >
                {ETPS.map(etp => (
                  <option key={etp.value} value={etp.value}>
                    {etp.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
        </CSSTransition>
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
