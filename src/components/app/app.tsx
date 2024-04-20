import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
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
            path={AppRoutes.Contacts}
            element={<ContactsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
