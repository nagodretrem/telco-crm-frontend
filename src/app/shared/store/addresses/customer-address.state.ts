import { CreateAddressRequest } from "../../../features/customer/models/requests/create-address-request";

export interface IndividualCustomerAddressState {
    individualCustomerAddress:CreateAddressRequest;
}

export const initialIndividualCustomerAddressState:IndividualCustomerAddressState = {
    individualCustomerAddress:{
        customerId:null,
        cityId: '',
        houseFlatNumber: '',
        street: '',
        addressDescription: ''
    }
}
