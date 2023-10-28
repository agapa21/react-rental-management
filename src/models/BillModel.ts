class BillModel {

    id: number;
    apartment_id: number;
    period: string;
    administrative_rent: string;
    electricity_bill: string;
    gas_bill: string;
    additional_costs: string;
    link: string;


    constructor(id: number, apartment_id: number, period: string, administrative_rent: string, electricity_bill: string,
        gas_bill: string, additional_costs: string, link: string) {
        this.id = id;
        this.apartment_id = apartment_id;
        this.period = period;
        this.administrative_rent = administrative_rent;
        this.electricity_bill = electricity_bill;
        this.gas_bill = gas_bill;
        this.additional_costs = additional_costs;
        this.link = link;
    }
}

export default BillModel;