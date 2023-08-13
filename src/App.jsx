/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import ProtectedRoutes from './routers/ProtectedRoutes';
import Global from './pages/Global/Global';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Client from './pages/Client/Client';
import ClientManagment from './pages/ClientManagment/ClientManagment';
import Sites from './pages/Sites/Sites';
import PTW from './pages/PTW/PTW';
import Invoices from './pages/BillingsSubscirptions/invoices';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/index';
import UserProfile from './pages/UserProfile/UserProfile';
import DangerCategories from './pages/PTW/content/DangerCategories/DangerCategories';
import DangerSubCategories from './pages/PTW/content/DangerCategories/DangerSubCategories/DangerSubCategories';
import RolesAndPermissions from './pages/RolesAndPersmissions';
import { GlobalStyles } from './GlobalStyles';

import './App.css';


function App() {
  const [pageTitle, setPageTitle] = useState('Safety Tracker V3');
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (pathname.includes('myprofile'))
    setPageTitle('Profile settings - Safety Tracker V3');

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes user={user}>
              <GlobalStyles />
              <Global />
            </ProtectedRoutes>
          }
        >
          {/* <Route path="/clients/:clientId" element={<ClientManagment />}>
            <Route path="sites" element={<Sites />} />
            <Route path="preferences" element={<Preferences />} />
          </Route>
          <Route path="/ppes" exact element={<PpeManagement />} />*/}
          <Route path="/profile" exact element={<Profile />} />
          <Route
            path="/roles-permissions"
            exact
            element={<RolesAndPermissions />}
          />
          <Route path="/users" exact element={<Users />} />
          <Route path="/users/:userId" exact element={<UserProfile />} />
          <Route path="/" exact element={<div>Hello</div>} />
          <Route path="/ptw/sub-category" exact element={<PTW />} />
          <Route path="/ptw/:topCat?/:cat?" exact element={<PTW />}>
            <Route path="danger-categories" element={<DangerCategories />} />
            <Route
              path="danger-categories/:catId"
              element={<DangerSubCategories />}
            />
            <Route path="*" element={<h1>...</h1>} />
          </Route>
          <Route path="/clients" exact element={<Client />} />
          <Route path="/billings-subscriptions/invoices" exact element={<Invoices />} />
          <Route path="/clients/:clientId" element={<ClientManagment />}>
            <Route path="sites" element={<Sites />} />
            {/* <Route path="preferences" element={<Preferences />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
