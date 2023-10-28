import { Link } from "react-router-dom";
import ApartmentModel from "../../../models/ApartmentModel";
import { useOktaAuth } from "@okta/okta-react";

export const SearchApartment: React.FC<{ apartment: ApartmentModel }> = (props) => {

    async function deleteApartment() {
        if (window.confirm('Czy na pewno chcesz usunąć to mieszkanie z bazy?')) {
            const url = `http://localhost:8080/api/apartments/deleteApartment?apartmentId=${props.apartment.id}`;
            const requestOptions = {
                method: 'PUT',
            };
            const returnResponse = await fetch(url, requestOptions);
            if (!returnResponse.ok) {
                throw new Error('Something went wrong!');
            }
    
            window.location.reload();
          } 
    }

    return (
        <div className='card mt-3 shadow p-3 b-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h4>
                            {props.apartment.title}
                        </h4>
                        <p className='card-text'>
                            {props.apartment.address}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <Link className='btn main-color btn-md px-4 me-md-2 fw-bold text-white' to={`info/${props.apartment.id}`}>
                        Zobacz szczegóły
                    </Link>
                    <button className='btn main-color fw-bold text-white ' onClick={deleteApartment}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    );
}