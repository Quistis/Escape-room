import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { AppRoutes } from '../../const';

const App = (): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path={AppRoutes.Main} element={<Layout />}>
          <Route
            index
            element={<MainPage />}
          />
          <Route
            path={AppRoutes.Quest}
            element={<QuestPage />}
          />
          <Route
            path={AppRoutes.Booking}
            element={<OnlyAuth onlyUnAuth={false} component={<BookingPage/>} />}
          />
          <Route
            path={AppRoutes.MyQuests}
            element={<OnlyAuth onlyUnAuth={false} component={<MyQuestsPage/>} />}
          />
          <Route
            path={AppRoutes.Contacts}
            element={<ContactsPage />}
          />
          <Route
            path={AppRoutes.Login}
            element={<OnlyUnAuth component={<LoginPage/>} />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
