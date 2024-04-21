import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestById } from '../../store/api-actions';
import Loader from '../../components/loader/loader';
import { replaceDifficulty, replaceTheme } from '../../utils/common';

const QuestPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestById(id));
    }
  }, [id, dispatch]);

  const currentQuest = useAppSelector((state) => state.QUESTS.currentQuest.data);
  const isLoading = useAppSelector((state) => state.QUESTS.currentQuest.loadingStatus);

  if (isLoading) {
    return <Loader/>;
  }

  if (!currentQuest) {
    return <div></div>;
  }

  const {title, level, type, peopleMinMax, description, coverImg, coverImgWebp} = currentQuest;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`}
          />
          <img
            src={`${coverImg}`}
            srcSet={`${coverImg} 2x`}
            width={1366}
            height={768}
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{replaceTheme(type)}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width={11} height={14} aria-hidden="true">
                <use xlinkHref="#icon-person" />
              </svg>
              {peopleMinMax[0]}–{peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width={14} height={14} aria-hidden="true">
                <use xlinkHref="#icon-level" />
              </svg>
              {replaceDifficulty(level)}
            </li>
          </ul>
          <p className="quest-page__description">
            {description}
          </p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={id ? `/quest/${id}/booking` : '/'}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
};

export default QuestPage;
