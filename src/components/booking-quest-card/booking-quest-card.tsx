import { Link } from 'react-router-dom';
import { TQuestReservation } from '../../types/booking';
import { replaceDifficulty } from '../../utils/common';

type BookingQuestCardProps = {
  reservation: TQuestReservation;
};

const BookingQuestCard = ({reservation}: BookingQuestCardProps):JSX.Element => {
  const {date, time, peopleCount, location, quest} = reservation;
  const {id, title, previewImg, previewImgWebp, level} = quest;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp} 2x`}
          />
          <img
            src={`${previewImg}`}
            srcSet={`${previewImg} 2x`}
            width={344}
            height={232}
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`/quest/${id}`}>
            {title}
          </Link>
          <span className="quest-card__info">
            {`[${date === 'today' ? 'сегодня' : 'завтра'}, ${time}. ${location.address}]`}
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {peopleCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {replaceDifficulty(level)}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default BookingQuestCard;
