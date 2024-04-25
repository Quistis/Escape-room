import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchQuestBookingInfoById, fetchQuestById, postQuestBookingInfo } from '../../store/api-actions';
import BookingDateSection from '../../components/booking-date-section/booking-date-section';
import Map from '../../components/map/map';
import Loader from '../../components/loader/loader';
import { TBookingData, TQuestBookingFormInfo } from '../../types/booking';
import { AppRoutes } from '../../const';

type FormData = {
  children: boolean;
  date: 'today' | 'tomorrow';
  name: string;
  person: string;
  tel: string;
};

const parseDateTime = (dateTimeStr: string) => {
  const dateRegex = /(today|tomorrow)(\d{2})h(\d{2})m/;
  const matchResult = dateTimeStr.match(dateRegex);

  if (matchResult !== null) {
    const [, date, hours, minutes] = matchResult;
    return {
      date,
      time: `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`,
    };
  } else {
    throw new Error('Invalid date format');
  }
};

const BookingPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [activeLocation, setActiveLocation] = useState<TBookingData | null>(null);
  const methods = useForm();
  const { register, handleSubmit, formState: {errors}, reset } = methods;
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = data as FormData;

    const withChildren: boolean = formData.children;

    const peopleCount: number = parseInt(formData.person, 10);

    const placeId: string = activeLocation?.id ?? '';

    const phone: string = formData.tel.replace(/\D/g, '');

    const { date, time } = parseDateTime(formData.date);

    const formattedData: TQuestBookingFormInfo = {
      'date': date as 'today' | 'tomorrow',
      'time': time,
      'contactPerson': formData.name,
      'phone': phone,
      'withChildren': withChildren,
      'peopleCount': peopleCount,
      'placeId': placeId,
    };

    if (currentQuest) {
      dispatch(postQuestBookingInfo({ formData: formattedData, questId: currentQuest?.id }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            reset();
            if (id) {
              dispatch(fetchQuestBookingInfoById(id));
            }
            navigate(AppRoutes.MyQuests);
          }
        });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  //TODO: Сделать какой-нибудь компонент с ошибкой
  if (!currentQuest) {
    return <div></div>;
  }

  const {title, coverImg, coverImgWebp} = currentQuest;
  //TODO: придумать что-то с типизацией onSubmit
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
        <FormProvider {...methods} >
          <form
            className="booking-form"
            action="https://echo.htmlacademy.ru/"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
            }}
          >
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              {todaysTimeSlots && <BookingDateSection timeSlots={todaysTimeSlots} date={'today'}/>}
              {tomorrowsTimeSlots && <BookingDateSection timeSlots={tomorrowsTimeSlots} date={'tomorrow'}/>}
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
                  placeholder="Имя"
                  {...register('name', {
                    required: 'Это поле обязательно',
                    pattern: {
                      value: /[А-Яа-яЁёA-Za-z'\- ]{1,}/,
                      message: 'Имя должно состоять из символов кириллицы или латиницы'
                    }
                  })}
                />
                {errors.name && <p style={{color: 'orange'}}>{errors.name.message?.toString()}</p>}
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">
                  Контактный телефон
                </label>
                <input
                  type="tel"
                  id="tel"
                  placeholder="Телефон"
                  {...register('tel', {
                    required: 'Это поле обязательно',
                    pattern: {
                      value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                      message: 'Введите номер в формате +7 (000) 000-00-00'
                    }
                  })}
                />
                {errors.tel && <p>{errors.tel.message?.toString()}</p>}
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">
                  Количество участников
                </label>
                <input
                  type="number"
                  id="person"
                  placeholder="Количество участников"
                  {...register('person', {
                    required: 'Это поле обязательно',
                    min: { value: currentQuest.peopleMinMax[0], message: `Минимальное значение должно быть ${currentQuest.peopleMinMax[0]}` },
                    max: { value: currentQuest.peopleMinMax[1], message: `Максимальное значение должно быть ${currentQuest.peopleMinMax[1]}` }
                  })}
                />
                {errors.person && <p>{errors.person.message?.toString()}</p>}
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input
                  type="checkbox"
                  id="children"
                  {...register('children')}
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
        </FormProvider>

      </div>
    </main>

  );
};

export default BookingPage;
