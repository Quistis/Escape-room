import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

const RecenterAutomatically = ({ location }: { location: TLocation | undefined }) => {
  const map = useMap();
  const lat = location?.coords[0];
  const lng = location?.coords[1];
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.setView([lat, lng]);
    }
  }, [lat, lng, map]);
  return null;
};

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

  return (
    <MapContainer
      center={activeLocation ? activeLocation.location.coords : coords}
      zoom={9}
      scrollWheelZoom
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
      {activeLocation && <RecenterAutomatically location={activeLocation.location}/>}

    </MapContainer>
  );
};

export default Map;
