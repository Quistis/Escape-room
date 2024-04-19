import FilterList from '../filter-list/filter-list';
import { TQuestFilterTypes } from '../../const';

type FilterSectionProps = {
  filterTheme: string;
  filters: TQuestFilterTypes[];
};

const FilterSection = ({filterTheme, filters}: FilterSectionProps): JSX.Element => (
  <fieldset className="filter__section">
    <legend className="visually-hidden">{filterTheme}</legend>
    <FilterList filters={filters} />
  </fieldset>
);

export default FilterSection;
