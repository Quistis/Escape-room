import { TSlot } from '../../types/booking';

type BookingDateItemProps = {
  timeSlot: TSlot;
};

const BookingDateItem = ({timeSlot}: BookingDateItemProps): JSX.Element => {
  const {time, isAvailable} = timeSlot;
  const [hours, minutes] = time.split(':');

  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        id={`today${hours}h${minutes}m`}
        name="date"
        required
        defaultValue={`today${hours}h${minutes}m`}
        disabled={!isAvailable}
      />
      <span className="custom-radio__label">{hours}:{minutes}</span>
    </label>
  );
};

export default BookingDateItem;
