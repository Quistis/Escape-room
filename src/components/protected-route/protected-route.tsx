import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Location } from 'history';

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
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  // const isAuthChecked = useAppSelector((state) => state.AUTH.authChecked);
  const userEmail = useAppSelector((store) => store.AUTH.userEmail);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   // Запрос еще выполняется
  //   // Выводим прелоадер в ПР
  //   // Здесь возвращается просто null для экономии времени
  //   return <Loader />;
  // }

  if (onlyUnAuth && userEmail) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from }: { from: LocationState['from'] } = (location.state || { from: { pathname: '/' } }) as { from: LocationState['from'] };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !userEmail) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: OnlyUnAuthProps) => (
  <ProtectedRoute onlyUnAuth component={component} />
);
