import BookingDateItem from '../booking-date-item/booking-date-item';
import { TSlot } from '../../types/booking';

type BookingDateSectionProps = {
  timeSlots: TSlot[];
  date: string;
};

const BookingDateSection = ({timeSlots, date}: BookingDateSectionProps): JSX.Element => (
  <fieldset className="booking-form__date-section">
    <legend className="booking-form__date-title">Сегодня</legend>
    <div className="booking-form__date-inner-wrapper">
      {timeSlots.map((slot) => <BookingDateItem key={slot.time} timeSlot={slot} date={date} />)}
    </div>
  </fieldset>
);


export default BookingDateSection;
