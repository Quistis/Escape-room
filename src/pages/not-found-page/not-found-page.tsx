import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <section className="error-screen">
      <Helmet>
        <title>
          6 Cities. Page not found
        </title>
      </Helmet>
      <h2 className="error-screen--title">404 Страница не найдена</h2>
      <img className="error-screen--image" src='/img/spin-peepo.gif' width='400' height='400' alt='Картинка сообщающая об ошибке' />
      <span className="error-screen--back">
        <Link to={AppRoutes.Main}>
          Вернуться на главную
        </Link>
      </span>
    </section>
  );
}

export default NotFoundScreen;
