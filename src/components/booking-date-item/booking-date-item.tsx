import { useFormContext } from 'react-hook-form';
import { TSlot } from '../../types/booking';

type BookingDateItemProps = {
  timeSlot: TSlot;
  date: string;
};

const BookingDateItem = ({timeSlot, date}: BookingDateItemProps): JSX.Element => {
  const { register } = useFormContext();
  const {time, isAvailable} = timeSlot;
  const [hours, minutes] = time.split(':');

  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        id={`${date}${hours}h${minutes}m`}
        required
        defaultValue={`${date}${hours}h${minutes}m`}
        disabled={!isAvailable}
        {...register('date', {required: true})}
      />
      <span className="custom-radio__label">{hours}:{minutes}</span>
    </label>
  );
};

export default BookingDateItem;
