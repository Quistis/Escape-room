import { Outlet, Link, useLocation, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoutes, AuthorizationStatus } from '../../const';

const Layout = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.AUTH.authStatus);
  const location = useLocation();
  const isLoginPage = location.pathname === AppRoutes.Login;
  const isQuestsPage = location.pathname === AppRoutes.Main;
  const isContactsPage = location.pathname === AppRoutes.Contacts;
  const isMyQuestsPage = location.pathname === AppRoutes.MyQuests;

  const handleLogoutButtonClick = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container container--size-l">
          <Link
            className="logo header__logo"
            to={AppRoutes.Main}
          >
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo" />
            </svg>
          </Link>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <NavLink
                  className={`link ${isQuestsPage ? 'active' : ''}`}
                  to={AppRoutes.Main}
                >
                  Квесты
                </NavLink>
              </li>
              <li className="main-nav__item">
                <NavLink
                  className={`link ${isContactsPage ? 'active' : ''}`}
                  to={AppRoutes.Contacts}
                >
                  Контакты
                </NavLink>
              </li>
              {authStatus === AuthorizationStatus.Auth &&
              <li className="main-nav__item">
                <NavLink
                  className={`link ${isMyQuestsPage ? 'active' : ''}`}
                  to={AppRoutes.MyQuests}
                >
                  Мои бронирования
                </NavLink>
              </li>}
            </ul>
          </nav>
          <div className="header__side-nav">
            {!isLoginPage && authStatus === AuthorizationStatus.Auth &&
              <Link
                className="btn btn--accent header__side-item"
                to={AppRoutes.Main}
                onClick={handleLogoutButtonClick}
              >
                Выйти
              </Link>}
            {!isLoginPage && authStatus !== AuthorizationStatus.Auth &&
              <Link
                className="btn header__side-item header__login-btn"
                to={AppRoutes.Login}
              >
                Вход
              </Link>}
            <a
              className="link header__side-item header__phone-link"
              href="tel:88003335599"
            >
              8 (000) 111-11-11
            </a>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="footer">
        <div className="container container--size-l">
          <div className="socials">
            <ul className="socials__list">
              <li className="socials__item">
                <a
                  className="socials__link"
                  href="#"
                  aria-label="Skype"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className="socials__icon socials__icon--default"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-skype-default" />
                  </svg>
                  <svg
                    className="socials__icon socials__icon--interactive"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-skype-interactive" />
                  </svg>
                </a>
              </li>
              <li className="socials__item">
                <a
                  className="socials__link"
                  href="#"
                  aria-label="ВКонтакте"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg
                    className="socials__icon socials__icon--default"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-vk-default" />
                  </svg>
                  <svg
                    className="socials__icon socials__icon--interactive"
                    width={28}
                    height={28}
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-vk-interactive" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
