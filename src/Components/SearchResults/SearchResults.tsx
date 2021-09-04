import React from 'react';
import cn from 'classnames';

import { ResultEntity } from '../../Store/reducer';

import s from './SearchResults.module.scss';

export const SearchResults = ({ results }: any) => {
  const determineReputation = (reputation: string) => {
    switch (reputation) {
      case 'Хорошая':
        return 'good';
      case 'Средняя':
        return 'medium';
      case 'Недобросовестная':
        return 'bad';
      case 'Неизвестно':
        return 'unknown';

      default:
        return 'unknown';
    }
  };

  return (
    <div className={s.SearchResults}>
      {results.map((item: ResultEntity, index: number) => {
        return (
          <div className={s.SearchResult} key={index}>
            <div className={s.SearchResultField}>
              <span>Название компании:</span>
              <h2>{item.company_name}</h2>
            </div>
            <div className={s.SearchResultField}>
              <span>Контактное лицо:</span>
              <h3>{item.contact_persons[0]}</h3>
            </div>
            <div className={s.SearchResultField}>
              <span>E-mail:</span>
              {item?.emails?.map((email, index) => (
                <h3 key={index}>{email}</h3>
              ))}
            </div>
            <div className={s.SearchResultField}>
              <span>Телефоны: </span>
              {item?.phones?.map((phone, index) => (
                <h3 key={index}>{phone}</h3>
              ))}
            </div>
            <div className={s.SearchResultField}>
              <span>Репутация: </span>
              <h3 className={cn(s.Reputation, s[determineReputation(item.reputation)])}>{item.reputation}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
