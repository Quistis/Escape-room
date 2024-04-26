import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Location } from 'history';
import { selectUserEmail } from '../../store/slices/authorization';

type ProtectedRouteProps = {
  onlyUnAuth: boolean;
  component: JSX.Element;
};

type OnlyUnAuthProps = {
  component: ReactElement;
};

type LocationState = {
  from: Location;
};

const ProtectedRoute = ({ onlyUnAuth = false, component }: ProtectedRouteProps) => {

  const userEmail = useAppSelector(selectUserEmail);
  const location = useLocation();

  if (onlyUnAuth && userEmail) {
    const { from }: LocationState = (location.state || { from: { pathname: '/' } }) as LocationState;
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userEmail) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: OnlyUnAuthProps) => (
  <ProtectedRoute onlyUnAuth component={component} />
);
