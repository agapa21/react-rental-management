import { Link } from "react-router-dom";
import BillModel from "../../models/BillModel";
import RentModel from "../../models/RentModel";

export const BillInformation: React.FC<{bill: BillModel, rent?: RentModel}> = (props) => {

    const bill_id = (props.bill.link).split('/')[5];

    return (
        <div className='card mt-3 shadow p-3 b-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h4>
                            {props.bill.period} 
                        </h4>
                        <h4 className="lead">Odstępne: {props.rent?.fee} zł</h4>
                        <h4 className="lead">Czynsz administracyjny: {props.bill.administrative_rent} zł</h4>
                        <h4 className="lead">Prąd: {props.bill.electricity_bill} zł</h4>
                        <h4 className="lead">Gaz: {props.bill.gas_bill} zł</h4>
                        <h4 className="lead">Dodatkowe koszta: {props.bill.additional_costs} zł</h4>
                    </div>
                </div>
                <div className='col-md-6 d-flex align-items-center d-flex justify-content-center'>
                <Link type='button' className='btn btn-primary mt-3 main-color' to={`/editbill/${bill_id}`}>
                                Edytuj rachunek 
                            </Link>
                            </div>
            </div>
            
        </div>
    );
}