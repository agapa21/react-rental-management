import { useEffect, useState } from "react";
import BillModel from "../../models/BillModel";
import { BillInformation } from "./BillInformation";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import RentModel from "../../models/RentModel";
import { AddNewBill } from "../ManageDataPages/AddNewBill";

export const BillsPage = () => {

    const [bills, setBills] = useState<BillModel[]>([]);
    const [rent, setRent] = useState<RentModel>();
    const [isLoadingRent, setIsLoadingRent] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [totalAmountOfBills, setTotalAmountOfBills] = useState(0);

    const apartmentId = (window.location.pathname).split('/')[2];

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
            setIsLoadingRent(false);

        };
        fetchRent().catch((error) => {
            setIsLoadingRent(false);
        })
    });

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
                    additional_costs: responseData[key].additionalCosts,
                    link: responseData[key]._links.self.href
                });
            }

            setBills(loadedBills);
            setTotalAmountOfBills(responseData);
            setIsLoading(false);
        };
        fetchBills().catch((error: any) => {
            setIsLoading(false);
        })

    });


    if (isLoading || isLoadingRent) {
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
        <div className="container">
                <div className="row">
                    <div className="col-lg">
                    {totalAmountOfBills <= 0 ?
                        <div className='m-5'>
                            <h3>
                            Brak rachunków
                            </h3>
                        </div>
                        :
                        <div className='row mt-3'>
                            {bills.map(bill => (
                                <BillInformation bill={bill} rent={rent} />
                            ))}
                        </div>
                    }
                    </div>
                    <div className="col-lg">
                        <AddNewBill />
                    </div>
                </div>
        </div>
    );
}