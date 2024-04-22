import BookingDateItem from '../booking-date-item/booking-date-item';
import { TSlot } from '../../types/booking';

type BookingDateSectionProps = {
  timeSlots: TSlot[];
};

const BookingDateSection = ({timeSlots}: BookingDateSectionProps): JSX.Element => (
  <fieldset className="booking-form__date-section">
    <legend className="booking-form__date-title">Сегодня</legend>
    <div className="booking-form__date-inner-wrapper">
      {timeSlots.map((slot) => <BookingDateItem key={slot.time} timeSlot={slot} />)}
    </div>
  </fieldset>
);


export default BookingDateSection;
