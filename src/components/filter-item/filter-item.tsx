import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FiltersSlice } from '../../store/slices/filters';
import { TQuestFilterTypes } from '../../const';

type FilterItemProps = {
  filter: TQuestFilterTypes;
};

const FilterItem = ({filter}: FilterItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentDifficultyFilter = useAppSelector((state) => state.FILTERS.currentDifficulty);
  const currentThemeFilter = useAppSelector((state) => state.FILTERS.currentTheme);
  const {changeTheme, changeDifficulty} = FiltersSlice.actions;
  const {id, name, isDefault, labelText, iconName, iconHeight, iconWidth} = filter;

  const isChecked = (name === 'type' && currentThemeFilter === id) || (name === 'level' && currentDifficultyFilter === id);

  const handleFilterClick = (evt: MouseEvent<HTMLInputElement>) => {
    const target = evt.currentTarget;
    const filterType = target.name;
    let filterId = target.id;

    if (filterType === 'type') {
      if (filterId === 'sciFi') {
        filterId = 'sci-fi';
      }
      dispatch(changeTheme({theme: filterId}));
    } else {
      dispatch(changeDifficulty({difficulty: filterId}));
    }

  };

  return (
    <li className="filter__item">
      <input
        type="radio"
        name={name}
        id={id}
        defaultChecked={isDefault}
        checked={isChecked}
        onClick={handleFilterClick}
      />
      <label className="filter__label" htmlFor={id}>
        {iconName &&
        <svg
          className="filter__icon"
          width={iconWidth}
          height={iconHeight}
          aria-hidden="true"
        >
          <use xlinkHref={`#icon-${iconName}`} />
        </svg>}
        <span className="filter__label-text">{labelText}</span>
      </label>
    </li>
  );
};

export default FilterItem;
