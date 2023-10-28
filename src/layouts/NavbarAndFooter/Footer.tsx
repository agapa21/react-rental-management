import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <div className='main-color'>
            <footer className='container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color'>
                <p className='col-md-4 text-white'>© Estate Agency App</p>
                <ul className='nav navbar-dark justify-content-end'>
                <li className='nav-item'>
                        <NavLink className='nav-link px-2 text-white' to='search'>
                            Wyszukiwanie
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link px-2 text-white'>
                            Informacje
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link px-2 text-white'>
                            Usterki
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link px-2 text-white'>
                            Rachunki
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}