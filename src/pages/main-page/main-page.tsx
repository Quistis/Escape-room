import { useAppSelector } from '../../hooks';
import FilterSection from '../../components/filter-section/filter-section';
import QuestCard from '../../components/quest-card/quest-card';
import { QuestThemeFilters, QuestDifficultyFilters } from '../../const';


const MainPage = ():JSX.Element => {
  const quests = useAppSelector((state) => state.QUESTS.cards.cardsData);
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
          {quests.map((quest) => <QuestCard key={quest.id} card={quest} />)}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
