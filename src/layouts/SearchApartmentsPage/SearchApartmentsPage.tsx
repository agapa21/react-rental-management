import { useEffect, useState } from 'react';
import ApartmentModel from '../../models/ApartmentModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchApartment } from './components/SearchApartment';
import RentModel from '../../models/RentModel';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

export const SearchApartmentPage = () => {

    const [apartments, setApartments] = useState<ApartmentModel[]>([]);
    const [allApartments, setAllApartments] = useState<ApartmentModel[]>([]);
    const [rentedApartments, setRentedApartments] = useState<ApartmentModel[]>([]);
    const [notRentedApartments, setNotRentedApartments] = useState<ApartmentModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');
    const [search, setSearch] = useState('');
    const [totalAmountOfApartments, setTotalAmountOfApartments] = useState(0);
    const [totalAmountOfAllApartments, setTotalAmountOfAllApartments] = useState(0);
    const [totalAmountOfRented, setTotalAmountOfRented] = useState(0);
    const [totalAmountOfNotRented, setTotalAmountOfNotRented] = useState(0);
    const [categorySelection, setCategorySelection] = useState('Wszystkie');
    const { authState } = useOktaAuth();

    useEffect(() => {
        const fetchAllApartments = async () => {

            let url: string = ``;
            const baseUrl: string = "http://localhost:8080/api/apartments";
            url = baseUrl + searchUrl;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.apartments;

            setTotalAmountOfAllApartments(responseJson.page.totalElements);

            const loadedApartments: ApartmentModel[] = [];

            for (const key in responseData) {
                loadedApartments.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    address: responseData[key].address,
                    landlord_name: responseData[key].landlord_name,
                    landlord_email: responseData[key].landlord_email,
                    landlord_mobile: responseData[key].landlord_mobile,
                });
            }

            setAllApartments(loadedApartments);
        };
        fetchAllApartments().catch((error: any) => {

        })

    }, [searchUrl]);
    
        useEffect(() => {
            const fetchRentedApartments = async () => {
                if (authState && authState.isAuthenticated) {
                const baseUrl: string = `http://localhost:8080/api/apartments/rented`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
    
                const response = await fetch(baseUrl, requestOptions);
    
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
    
                const responseJson = await response.json();

                const loadedApartments: ApartmentModel[] = [];

                responseJson.apartmentsOptional.map((o: any) => {
                    loadedApartments.push({
                        id: o.id,
                        title: o.title,
                        address: o.address,
                        landlord_name: o.landlordName,
                        landlord_email: o.landlordEmail,
                        landlord_mobile: o.landlordMobile,
                    });
                })
    
                setRentedApartments(loadedApartments);
                setTotalAmountOfRented(loadedApartments.length)
                }
            };
                fetchRentedApartments().catch((error: any) => {

                })
        
            });

            useEffect(() => {
                const fetchNotRentedApartments = async () => {
                    if (authState && authState.isAuthenticated) {
                    const baseUrl: string = `http://localhost:8080/api/apartments/notRented`;

                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    };
        
                    const response = await fetch(baseUrl, requestOptions);
        
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
        
                    const responseJson = await response.json();
    
                    const loadedApartments: ApartmentModel[] = [];
    
                    responseJson.apartments.map((o: any) => {
                        loadedApartments.push({
                            id: o.id,
                            title: o.title,
                            address: o.address,
                            landlord_name: o.landlordName,
                            landlord_email: o.landlordEmail,
                            landlord_mobile: o.landlordMobile,
                        });
                    })
        
                    setNotRentedApartments(loadedApartments);
                    setTotalAmountOfNotRented(loadedApartments.length)
                }
                };
                    fetchNotRentedApartments().catch((error: any) => {
                    })
            
                });


    if (!isLoading) {
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

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}`)
        }
    }

    const categoryField = (value: string) => {
        if (
            value === 'Wynajęte'
        ) {
            setCategorySelection(value);
            setApartments(rentedApartments);
            setTotalAmountOfApartments(totalAmountOfRented);
            setSearchUrl('');
        }
        if (
            value === 'Niewynajęte'
        ) {
            setCategorySelection(value);
            setApartments(notRentedApartments);
            setTotalAmountOfApartments(totalAmountOfNotRented);
            setSearchUrl('');
        }
        if(
            value === 'Wszystkie'
        )
        {
            setCategorySelection(value);
            setApartments(allApartments);
            setTotalAmountOfApartments(totalAmountOfAllApartments);
            setSearchUrl('');
        }
    }

    return (
        <div className='container'>
                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className='d-flex'>
                            <input className='form-control me-2' type='search'
                                placeholder='Szukaj' aria-labelledby='Search'
                                onChange={e => setSearch(e.target.value)} />
                            <button className='btn main-color text-white'
                                onClick={() => searchHandleChange()}>
                                Szukaj
                            </button>
                        </div>
                    </div>

                    <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle main-color' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu main-color text-white' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('Wszystkie')}>
                                        <a className='dropdown-item text-white' href='#'>
                                            Wszystkie
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Wynajęte')}>
                                        <a className='dropdown-item text-white' href='#'>
                                            Wynajęte
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Niewynajęte')}>
                                        <a className='dropdown-item text-white' href='#'>
                                            Niewynajęte
                                        </a>
                                    </li>
                                </ul>
                                
                            </div>
                            
                        </div>
                        
                        <div className='col d-flex align-items-end flex-column'>
                        <Link type='button' className='btn main-color btn-info-layout btn-md text-white' to={`/addApartment`}>
                        Dodaj nowe mieszkanie
                    </Link>
                        </div>
                        </div>
                    {categorySelection === 'Wszystkie' ?
                   <>
                   <div className='mt-3'>
                       <h5>Wyników wyszukiwania: {totalAmountOfAllApartments}
                       </h5>
                   </div>
                   {allApartments.map(apartment => (
                       <SearchApartment apartment={apartment} key={apartment.id} />
                   ))}

               </>
                    :
                    <>
                    {totalAmountOfApartments > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Wyników wyszukiwania: {totalAmountOfApartments}
                                </h5>
                            </div>
                            {apartments.map(apartment => (
                                <SearchApartment apartment={apartment} key={apartment.id} />
                            ))}

                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Brak wyników wyszukiwania
                            </h3>
                        </div>
                    }
                        </>
                   }

            </div>
    );
}
