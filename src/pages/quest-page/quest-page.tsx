import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestById } from '../../store/api-actions';
import Loader from '../../components/loader/loader';
import NotFoundScreen from '../not-found-page/not-found-page';
import { selectCurrentQuest, selectCurrentQuestLoadingStatus } from '../../store/slices/quests';
import { selectAuthStatus } from '../../store/slices/authorization';
import { replaceDifficulty, replaceTheme } from '../../utils/common';
import { AppRoutes, AuthorizationStatus } from '../../const';

const QuestPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestById(id));
    }
  }, [id, dispatch]);

  const currentQuest = useAppSelector(selectCurrentQuest);
  const authStatus = useAppSelector(selectAuthStatus);
  const isLoading = useAppSelector(selectCurrentQuestLoadingStatus);

  if (isLoading) {
    return <Loader/>;
  }

  if (!currentQuest) {
    return <NotFoundScreen />;
  }

  const {title, level, type, peopleMinMax, description, coverImg, coverImgWebp} = currentQuest;

  return (
    <main className="decorated-page quest-page">
      <Helmet>
        <title>
          Escape Room. Quest
        </title>
      </Helmet>
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
            to={authStatus === AuthorizationStatus.Auth && id ? `/quest/${id}/booking` : AppRoutes.Login}
            state={{previousLocation: `/quest/${id ? id : ''}/booking`}}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
};

export default QuestPage;
