import { Link, NavLink } from 'react-router-dom'
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { useOktaAuth } from '@okta/okta-react';

export const Navbar = () => {

  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />
  }

  const handleLogout = async () => oktaAuth.signOut();
  console.log(authState);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color'>
        <div className='container-fluid'>
        <span className='navbar-brand'>Estate Agency</span>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
          <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>Zarządzanie</NavLink>
            </li>
            <li className='nav-item'>
              <a className='nav-link'>Powiadomienia</a>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
          {!authState.isAuthenticated ?
              <li className='nav-item m-1'>
                <Link type='button' className='btn btn-outline-light' to='/login'>Zaloguj się</Link>
              </li>
              :
              <li>
                <button className='btn btn-outline-light' onClick={handleLogout}>Wyloguj się</button>
              </li>
            }
          </ul>
        </div>
        </div>
    </nav>
  );
}