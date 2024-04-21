import { Link } from 'react-router-dom';
import { TQuestsCard } from '../../types/quest';
import { replaceDifficulty } from '../../utils/common';

type QuestCardProps = {
  card: TQuestsCard;
};

const QuestCard = ({card}: QuestCardProps) => {
  const {id, title, previewImg, previewImgWebp, level, peopleMinMax} = card;

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
            srcSet={`${previewImg}`}
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
        </div>
        <ul className="tags quest-card__tags">
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
      </div>
    </div>
  );
};

export default QuestCard;
