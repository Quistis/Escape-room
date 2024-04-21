import { useAppSelector } from '../../hooks';
import FilterSection from '../../components/filter-section/filter-section';
import QuestCard from '../../components/quest-card/quest-card';
import Loader from '../../components/loader/loader';
import { QuestThemeFilters, QuestDifficultyFilters } from '../../const';

const MainPage = ():JSX.Element => {
  const quests = useAppSelector((state) => state.QUESTS.cards.cardsData);
  const currentTheme = useAppSelector((state) => state.FILTERS.currentTheme);
  const currentDifficulty = useAppSelector((state) => state.FILTERS.currentDifficulty);
  const isLoading = useAppSelector((state) => state.QUESTS.cards.loadingStatus);

  const isNotAllOrAny = (value: string) => value !== 'all' && value !== 'any';

  const filteredQuests = quests.filter((quest) => {

    const themeFilter = currentTheme === 'all' || currentTheme === quest.type || !isNotAllOrAny(currentTheme);
    const difficultyFilter = currentDifficulty === 'any' || currentDifficulty === quest.level || !isNotAllOrAny(currentDifficulty);

    return themeFilter && difficultyFilter;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
            Выберите тематику
          </h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <FilterSection filterTheme='Тематика' filters={QuestThemeFilters} />
            <FilterSection filterTheme='Сложность' filters={QuestDifficultyFilters} />
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <div className="cards-grid">
          {filteredQuests.length === 0}
          {filteredQuests.length !== 0 && filteredQuests.map((quest) => <QuestCard key={quest.id} card={quest} />)}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
