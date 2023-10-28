import { Link } from "react-router-dom";
import ApartmentModel from "../../../models/ApartmentModel";

export const SearchApartment: React.FC<{ apartment: ApartmentModel }> = (props) => {
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
                </div>
            </div>
            
        </div>
    );
}