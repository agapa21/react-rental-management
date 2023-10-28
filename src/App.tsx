import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { SearchApartmentPage } from './layouts/SearchApartmentsPage/SearchApartmentsPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { InformationPage } from './layouts/InformationPage/InformationPage';
import { BillsPage } from './layouts/BillsPage/BillsPage';
import { AddNewBill } from './layouts/ManageDataPages/AddNewBill';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react'
import { EditRentPage } from './layouts/EditBillPage/EditRentPage';
import { EditBillPage } from './layouts/EditBillPage/EditBillPage';
import { EditApartmentPage } from './layouts/EditBillPage/EditApartmentPage';
import { AddNewApartment } from './layouts/ManageDataPages/AddNewApartment';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>
            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path='/' exact>
              <Redirect to='/search' />
            </SecureRoute>
            <SecureRoute path='/search'>
              <SearchApartmentPage />
            </SecureRoute>
            <SecureRoute path='/info'>
              <InformationPage />
            </SecureRoute>
            <SecureRoute path='/bills'>
              <BillsPage />
            </SecureRoute>
            <SecureRoute path='/addBill'>
              <AddNewBill />
            </SecureRoute>
            <SecureRoute path='/addApartment'>
              <AddNewApartment />
            </SecureRoute>
            <SecureRoute path='/editBill'>
              <EditBillPage />
            </SecureRoute>
            <SecureRoute path='/editRent'>
              <EditRentPage />
            </SecureRoute>
            <SecureRoute path='/editApartment'>
              <EditApartmentPage />
            </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}