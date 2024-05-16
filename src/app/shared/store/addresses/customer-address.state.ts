import { CreateAddressRequest } from "../../../features/customer/models/requests/create-address-request";

export interface CustomerAddressState {
  customerAddress: CreateAddressRequest;
  customerAddresses: CreateAddressRequest[];
}

export const initialCustomerAddressState: CustomerAddressState = {
  customerAddress: {
    customerId : '',
    cityId: '',
    houseFlatNumber: '',
    street: '',
    addressDescription: ''
  },
  customerAddresses: []
};
