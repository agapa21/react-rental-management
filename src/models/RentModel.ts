class RentModel {

    id: number;
    apartment_id: number;
    start_date: string;
    end_date: string;
    deposit: number;
    fee: number;
    tenant_name: string;
    tenant_email: string;
    tenant_number: string;

    constructor(id: number, apartment_id: number, start_date: string, end_date: string, deposit: number,
        fee: number, tenant_name: string, tenant_email: string, tenant_number: string) {
        this.id = id;
        this.apartment_id = apartment_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.deposit = deposit;
        this.fee = fee;
        this.tenant_name = tenant_name;
        this.tenant_email = tenant_email;
        this.tenant_number = tenant_number;
    }
}

export default RentModel;