import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { AppRoutes } from '../../const';

const Layout = (): JSX.Element => {
  const [activeLink, setActiveLink] = useState('Квесты');

  const handleLinkClick = (label: string) => {
    setActiveLink(label);
  };

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container container--size-l">
          <Link
            className="logo header__logo"
            to={AppRoutes.Main}
            onClick={() => handleLinkClick('Квесты')}
          >
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo" />
            </svg>
          </Link>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link
                  className={`link ${activeLink === 'Квесты' ? 'active' : ''}`}
                  to={AppRoutes.Main}
                  onClick={() => handleLinkClick('Квесты')}
                >
                  Квесты
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className={`link ${activeLink === 'Контакты' ? 'active' : ''}`}
                  to={AppRoutes.Contacts}
                  onClick={() => handleLinkClick('Контакты')}
                >
                  Контакты
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className={`link ${activeLink === 'Мои бронирования' ? 'active' : ''}`}
                  to={AppRoutes.MyQuests}
                  onClick={() => handleLinkClick('Мои бронирования')}
                >
                  Мои бронирования
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__side-nav">
            <a className="btn btn--accent header__side-item" href="#">
              Выйти
            </a>
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
