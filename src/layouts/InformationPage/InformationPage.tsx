import ApartmentModel from "../../models/ApartmentModel";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import RentModel from "../../models/RentModel";
import { Link } from "react-router-dom";
import { AddNewRent } from "../ManageDataPages/AddNewRent";
import { useOktaAuth } from "@okta/okta-react";

export const InformationPage = () => {

    const [apartment, setApartment] = useState<ApartmentModel>();
    const [rent, setRent] = useState<RentModel>();
    const [isLoadingApartment, setIsLoadingApartment] = useState(true);
    const [isLoadingRent, setIsLoadingRent] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [daysLeft, setDaysLeft] = useState(0);
    const [isLoadingDaysLeft, setIsLoadingDaysLeft] = useState(true);

    const [isRented, setIsRented] = useState(0);

    const apartmentId = (window.location.pathname).split('/')[2];


    async function renewEndDate() {
            const url = `http://localhost:8080/api/rents/extendLease?apartmentId=${apartmentId}`;
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const returnResponse = await fetch(url, requestOptions);

            if (!returnResponse.ok) {
                throw new Error('Something went wrong!');
            }
    }

    async function endLease() {
            const url = `http://localhost:8080/api/rents/endLease?apartmentId=${apartmentId}`;
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const returnResponse = await fetch(url, requestOptions);
            if (!returnResponse.ok) {
                throw new Error('Something went wrong!');
            }
    }

    useEffect(() => {
        const fetchApartment = async () => {
            const baseUrl: string = `http://localhost:8080/api/apartments/${apartmentId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedApartment: ApartmentModel = {
                id: responseJson.id,
                title: responseJson.title,
                address: responseJson.address,
                landlord_name: responseJson.landlordName,
                landlord_email: responseJson.landlordEmail,
                landlord_mobile: responseJson.landlordMobile,
            };

            setApartment(loadedApartment);
            setIsLoadingApartment(false);
        }
        fetchApartment().catch((error: any) => {
            setIsLoadingApartment(false);
        })
    });

    useEffect(() => {
        const fetchRent = async () => {
            const baseUrl: string = `http://localhost:8080/api/rents/search/findByApartmentId?apartmentId=${apartmentId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedRent: RentModel = {
                id: responseJson.id,
                apartment_id: responseJson.apartmentId,
                start_date: responseJson.startDate,
                end_date: responseJson.endDate,
                deposit: responseJson.deposit,
                fee: responseJson.fee,

                tenant_name: responseJson.tenantName,
                tenant_email: responseJson.tenantEmail,
                tenant_number: responseJson.tenantNumber,
            };

            setRent(loadedRent);
            setIsRented(loadedRent.deposit);
            setIsLoadingRent(false);
        }
        fetchRent().catch((error: any) => {
            setIsLoadingRent(false);
        })
    });

    useEffect(() => {
        const fetchDaysLeft = async () => {
                const baseUrl: string = `http://localhost:8080/api/rents/daysLeft?apartmentId=${apartmentId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const response = await fetch(baseUrl, requestOptions);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const responseJson = await response.json();

                setDaysLeft(responseJson.daysLeft);
                setIsLoadingDaysLeft(false);
            }
        fetchDaysLeft().catch((error: any) => {
            setIsLoadingDaysLeft(false);
        })
    });


    if (isLoadingRent || isLoadingApartment || isLoadingDaysLeft) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='ml-2'>

                        <div className="row align-items-start">
                            <dl className="col">
                                <h2 className='text'>{apartment?.title}</h2>
                                <h4 className='lead'>{apartment?.address}</h4>
                                <hr />
                                <h5 className='text'>Dane najemcy mieszkania:</h5>
                                <h4 className="lead">{rent?.tenant_name}</h4>
                                <h4 className="lead">{rent?.tenant_email}</h4>
                                <h4 className="lead">{rent?.tenant_number}</h4>
                                <hr />
                                <h5 className='text'>Dane właściciela mieszkania:</h5>
                                <h4 className="lead">{apartment?.landlord_name}</h4>
                                <h4 className="lead">{apartment?.landlord_email}</h4>
                                <h4 className="lead">{apartment?.landlord_mobile}</h4>
                                <hr />
                                <h5 className='text'>Okres umowy najmu:</h5>
                                <h4 className="lead">{rent?.start_date} - {rent?.end_date}</h4>
                                <h5 className="text">Do zakończenia umowy najmu pozostało {daysLeft} dni</h5>
                                <hr />
                                <h5 className='text'>Kaucja:</h5>
                                <h4 className="lead">{rent?.deposit} zł</h4>
                            </dl>
                            {isRented > 0 ?
                                <dl className="col">
                                    <div className="col-3 mx-auto">
                                        <Link type='button' className='btn main-color btn-info-layout fw-bold text-white'
                                            to={`/editApartment/${apartmentId}`}>Edytuj dane mieszkania</Link>
                                        <Link type='button' className='btn main-color btn-info-layout fw-bold text-white'
                                            to={`/editRent/${apartmentId}`}>Edytuj dane najmu</Link>
                                        <hr />
                                        <Link type='button' className='btn main-color btn-info-layout fw-bold text-white'
                                            to={`/bills/${apartmentId}`}>Zobacz rachunki</Link>
                                        <button type='button' className='btn main-color btn-info-layout btn-md fw-bold text-white' onClick={renewEndDate}>
                                            Wydłuż najem
                                        </button>
                                        <button type='button' className='btn main-color btn-info-layout btn-md fw-bold text-white' onClick={endLease}>
                                            Zakończ najem
                                        </button>
                                    </div>
                                </dl>
                                :
                                <dl className="col">
                                    <AddNewRent />
                                </dl>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}