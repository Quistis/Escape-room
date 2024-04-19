import { TQuestFilterTypes } from '../../const';

type FilterItemProps = {
  filter: TQuestFilterTypes;
};

const FilterItem = ({filter}: FilterItemProps): JSX.Element => {
  const {id, name, isDefault, labelText, iconName, iconHeight, iconWidth} = filter;

  return (
    <li className="filter__item">
      <input type="radio" name={name} id={id} defaultChecked={isDefault} />
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
