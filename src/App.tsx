import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { SearchApartmentPage } from './layouts/SearchApartmentsPage/SearchApartmentsPage';
import { Route, Switch } from 'react-router-dom';
import { InformationPage } from './layouts/InformationPage/InformationPage';
import { BillsPage } from './layouts/BillsPage/BillsPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
        <Route path='/search'>
          <SearchApartmentPage />
        </Route>
        <Route path='/info'>
          <InformationPage />
        </Route>
        <Route path='/bills'>
          <BillsPage />
        </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
