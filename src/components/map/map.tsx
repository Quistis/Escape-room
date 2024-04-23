import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import { useAppSelector } from '../../hooks';
import { TLocation, TBookingData } from '../../types/booking';
import { AppRoutes } from '../../const';
import defaultPin from '../../../markup/img/svg/pin-default.svg';
import activePin from '../../../markup/img/svg/pin-active.svg';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  location?: TLocation;
  activeLocation?: TBookingData | null;
  onMarkerClick?: (bookingItem: TBookingData) => void;
};

const redMarker = new L.Icon({
  iconUrl: activePin,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultMarker = new L.Icon({
  iconUrl: defaultPin,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ location = { address: '', coords: [59.968322, 30.317359] }, activeLocation, onMarkerClick}: MapProps): JSX.Element => {
  const {coords} = location;
  const pageAdress = useLocation();
  const isContactsPage = pageAdress.pathname === AppRoutes.Contacts;
  const bookingData = useAppSelector((state) => state.BOOKING.bookingData);

  const handleMarkerClick = (bookingItem: TBookingData) => {
    if (onMarkerClick) {
      onMarkerClick(bookingItem);
    }
  };
  //TODO: Некорректно центрируется карта при первом рендере, что-то придумать надо,наверное, я уже хз :D
  return (
    <MapContainer
      center={activeLocation ? activeLocation.location.coords : coords}
      zoom={11}
      // scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!isContactsPage ? bookingData?.map((item) => (
        <Marker
          position={item.location.coords}
          key={item.id}
          icon={(activeLocation && item.id === activeLocation.id) ? redMarker : defaultMarker}
          eventHandlers={{ click: () => onMarkerClick && handleMarkerClick(item) }}
        >
        </Marker>
      ))
        :
        <Marker position={location.coords}>
        </Marker>}
    </MapContainer>
  );
};

export default Map;
