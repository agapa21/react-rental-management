import { NavLink } from 'react-router-dom'

export const Navbar = () => {

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color'>
        <div className='container-fluid'>
        <span className='navbar-brand'>Estate Agency</span>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
          <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>Wyszukiwanie</NavLink>
            </li>
            <li className='nav-item'>
            <NavLink className='nav-link' to='/info/1'>Informacje</NavLink>
            </li>
            <li className='nav-item'>
              <a className='nav-link'>Usterki</a>
            </li>
              <li className='nav-item'>
                <a className='nav-link'>Rachunki</a>
              </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
              <li className='nav-item m-1'>
                <a type='button' className='btn btn-outline-light'>Wyloguj się</a>
              </li>
          </ul>
        </div>
        </div>
    </nav>
  );
}