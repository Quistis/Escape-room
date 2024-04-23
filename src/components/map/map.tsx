import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { TLocation } from '../../types/booking';
import { AppRoutes } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  location?: TLocation;
};

const Map = ({ location = { address: '', coords: [59.968322, 30.317359] }}: MapProps): JSX.Element => {
  const {coords} = location;
  const pageAdress = useLocation();
  const isContactsPage = pageAdress.pathname === AppRoutes.Contacts;
  const bookingData = useAppSelector((state) => state.BOOKING.bookingData);

  return (
    <MapContainer
      center={coords}
      zoom={9}
      // scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!isContactsPage ? bookingData?.map((item) => (
        <Marker position={item.location.coords} key={item.id}>
          <Popup>
            <div>
              <h2>{item.location.address}</h2>
            </div>
          </Popup>
        </Marker>
      ))
        :
        <Marker position={location.coords}>
        </Marker>}
    </MapContainer>
  );
};

export default Map;
