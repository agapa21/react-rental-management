import { useEffect, useState } from "react";
import BillModel from "../../models/BillModel";
import { BillInformation } from "./BillInformation";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import RentModel from "../../models/RentModel";

export const BillsPage = () => {

    const [bills, setBills] = useState<BillModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
  

    const apartmentId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBills = async () => {

            const url: string = `http://localhost:8080/api/bills/search/findByApartmentId?apartmentId=${apartmentId}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.bills;

            const loadedBills: BillModel[] = [];

            for (const key in responseData) {
                loadedBills.push({
                    id: responseData[key].id,
                    apartment_id: responseData[key].apartmentId,
                    period: responseData[key].period,
                    administrative_rent: responseData[key].administrativeRent,
                    electricity_bill: responseData[key].electricityBill,
                    gas_bill: responseData[key].gasBill,
                    additional_costs: responseData[key].additionalCosts
                });
            }

            setBills(loadedBills);
            setIsLoading(false);
        };
        fetchBills().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    });


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
    
    return (
        <div>
             <div className='container'>
                <div>
                    <div className='row mt-5'>
                    {bills.map(bill => (
                               <BillInformation bill={bill}/> 
                                ))}   
                </div>
            </div>
        </div>
        </div>
    );
}