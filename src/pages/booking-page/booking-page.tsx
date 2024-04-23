import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchQuestBookingInfoById, fetchQuestById } from '../../store/api-actions';
import BookingDateSection from '../../components/booking-date-section/booking-date-section';
import Map from '../../components/map/map';
import Loader from '../../components/loader/loader';
import { TBookingData } from '../../types/booking';

const BookingPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [activeLocation, setActiveLocation] = useState<TBookingData | null>(null);
  const currentQuest = useAppSelector((state) => state.QUESTS.currentQuest.data);

  useEffect(() => {
    if (id && !currentQuest) {
      dispatch(fetchQuestById(id));
    }
    if (id) {
      dispatch(fetchQuestBookingInfoById(id));
    }
  }, [id, currentQuest, dispatch]);

  const bookingData = useAppSelector((state) => state.BOOKING.bookingData);

  useEffect(() => {
    if (bookingData) {
      setActiveLocation(bookingData[0]);
    }
  }, [bookingData]);

  const todaysTimeSlots = activeLocation !== null && activeLocation !== undefined ? activeLocation.slots.today : null;
  const tomorrowsTimeSlots = activeLocation !== null && activeLocation !== undefined ? activeLocation.slots.tomorrow : null;
  const isLoading = useAppSelector((state) => state.BOOKING.loadingStatus);

  const handleLocationSelect = (bookingItem: TBookingData) => {
    setActiveLocation(bookingItem);
  };

  if (isLoading) {
    return <Loader />;
  }

  //TODO: Сделать какой-нибудь компонент с ошибкой
  if (!currentQuest) {
    return <div></div>;
  }

  const {title, coverImg, coverImgWebp} = currentQuest;

  return (
    <main className="page-content decorated-page">
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
            height={1959}
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">
            Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">
            {title}
          </p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              <div className="map__container">
                <Map activeLocation={activeLocation} onMarkerClick={handleLocationSelect}/>
              </div>
            </div>
            <p className="booking-map__address">
              Вы&nbsp;выбрали: {activeLocation && activeLocation.location.address}
            </p>
          </div>
        </div>
        <form
          className="booking-form"
          action="https://echo.htmlacademy.ru/"
          method="post"
        >
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            {todaysTimeSlots && <BookingDateSection timeSlots={todaysTimeSlots}/>}
            {tomorrowsTimeSlots && <BookingDateSection timeSlots={tomorrowsTimeSlots} />}
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Имя"
                required
                pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">
                Контактный телефон
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                placeholder="Телефон"
                required
                pattern="[0-9]{10,}"
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">
                Количество участников
              </label>
              <input
                type="number"
                id="person"
                name="person"
                placeholder="Количество участников"
                required
              />
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input
                type="checkbox"
                id="children"
                name="children"
                defaultChecked
              />
              <span className="custom-checkbox__icon">
                <svg width={20} height={17} aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Со&nbsp;мной будут дети
              </span>
            </label>
          </fieldset>
          <button
            className="btn btn--accent btn--cta booking-form__submit"
            type="submit"
          >
            Забронировать
          </button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input
              type="checkbox"
              id="id-order-agreement"
              name="user-agreement"
              required
            />
            <span className="custom-checkbox__icon">
              <svg width={20} height={17} aria-hidden="true">
                <use xlinkHref="#icon-tick" />
              </svg>
            </span>
            <span className="custom-checkbox__label">
              Я&nbsp;согласен с
              <a className="link link--active-silver link--underlined" href="#">
                правилами обработки персональных данных
              </a>
              &nbsp;и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </main>

  );
};

export default BookingPage;
