import { Link } from "react-router-dom";
import BillModel from "../../models/BillModel";
import RentModel from "../../models/RentModel";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const BillInformation: React.FC<{bill: BillModel}> = (props) => {

    const [httpError, setHttpError] = useState(null);
    const [rent, setRent] = useState<RentModel>();
    const [isLoadingRent, setIsLoadingRent] = useState(true);

    useEffect(() => {
        const fetchRent = async () => {
            const baseUrl: string = `http://localhost:8080/api/rents/search/findByApartmentId?apartmentId=${props.bill.apartment_id}`;

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
                tenant_number: responseJson.tenantNumber
            };

            setRent(loadedRent);
            setIsLoadingRent(false);
           
        };
        fetchRent().catch((error) => {
            setIsLoadingRent(false);
            setHttpError(error.message);
        })
    });

    if (isLoadingRent) {
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
        <div className='card mt-3 shadow p-3 b-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h4>
                            {props.bill.period} 
                        </h4>
                        <h4 className="lead">Odstępne: {rent?.fee} zł</h4>
                        <h4 className="lead">Czynsz administracyjny: {props.bill.administrative_rent} zł</h4>
                        <h4 className="lead">Prąd: {props.bill.electricity_bill} zł</h4>
                        <h4 className="lead">Gaz: {props.bill.gas_bill} zł</h4>
                        <h4 className="lead">Dodatkowe koszta: {props.bill.additional_costs} zł</h4>
                    </div>
                </div>
            </div>
            
        </div>
    );
}