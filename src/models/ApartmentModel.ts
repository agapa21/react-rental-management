class ApartmentModel{

    id: number;
    title: string;
    address: string;
    landlord_name: string;
    landlord_email: string;
    landlord_mobile: string;

    constructor(id: number, title: string, address: string,landlord_name: string,
        landlord_email: string, landlord_mobile: string){
            this.id =id;
            this.title = title;
            this.address = address;
            this.landlord_name = landlord_name;
            this.landlord_email = landlord_email;
            this.landlord_mobile = landlord_mobile;
    }
}

export default ApartmentModel;