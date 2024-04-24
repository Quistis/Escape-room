import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestsReservations } from '../../store/api-actions';
import BookingQuestCard from '../../components/booking-quest-card/booking-quest-card';
import Loader from '../../components/loader/loader';

const MyQuestsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const reservationsData = useAppSelector((state) => state.RESERVATIONS.reservationsData);
  const isLoading = useAppSelector((state) => state.RESERVATIONS.loadingStatus);

  useEffect(() => {
    dispatch(fetchQuestsReservations());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="page-content decorated-page">
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
          {reservationsData?.map((quest) => <BookingQuestCard key={quest.id} reservation={quest}/>)}
        </div>
      </div>
    </main>
  );
};

export default MyQuestsPage;
