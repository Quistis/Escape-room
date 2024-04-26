import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestsReservations } from '../../store/api-actions';
import { selectReservationsData, selectReservationsLoadingStatus } from '../../store/slices/reservations';
import BookingQuestCard from '../../components/booking-quest-card/booking-quest-card';
import Loader from '../../components/loader/loader';
import EmptyQuests from '../../components/empty-quests/empty-quests';

const MyQuestsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const reservationsData = useAppSelector(selectReservationsData);
  const isLoading = useAppSelector(selectReservationsLoadingStatus);

  useEffect(() => {
    dispatch(fetchQuestsReservations());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="page-content decorated-page">
      <Helmet>
        <title>
          Escape Room. My Quests
        </title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width={1366}
            height={1959}
            alt=""
          />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">
            Мои бронирования
          </h1>
        </div>
        <div className="cards-grid">
          {reservationsData?.length === 0 && <EmptyQuests />}
          {reservationsData?.map((quest) => <BookingQuestCard key={quest.id} reservation={quest}/>)}
        </div>
      </div>
    </main>
  );
};

export default MyQuestsPage;
