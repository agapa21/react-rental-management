import { useEffect, useState } from 'react';
import ApartmentModel from '../../models/ApartmentModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchApartment } from './components/SearchApartment';

export const SearchApartmentPage = () => {

    const [apartments, setApartments] = useState<ApartmentModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');
    const [search, setSearch] = useState('');
    const [totalAmountOfApartments, setTotalAmountOfApartments] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {

            let url: string = '';
            const baseUrl: string = "http://localhost:8080/api/apartments";

            if (searchUrl === '') {
                url = `${baseUrl}`;
            } else {
                url = baseUrl+searchUrl;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.apartments;

            setTotalAmountOfApartments(responseJson.page.totalElements);

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

            setApartments(loadedApartments);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, [searchUrl]);

    if (isLoading) {
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

    return (
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Szukaj' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Szukaj
                                </button>
                            </div>
                    </div>
                    {totalAmountOfApartments > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Wyników wyszukiwania: {totalAmountOfApartments}</h5>
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
                </div>
            </div>
        </div>
    );
}