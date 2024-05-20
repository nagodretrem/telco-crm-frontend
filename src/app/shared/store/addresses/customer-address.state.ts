import { CreateAddressRequest } from "../../../features/customer/models/requests/create-address-request";

export interface CustomerAddressState {
  customerAddress: CreateAddressRequest;
  customerAddresses: CreateAddressRequest[];
}

export const initialCustomerAddressState: CustomerAddressState = {
  customerAddress: {
    addressId: '',
    customerId : '',
    cityId: '',
    cityName: '',
    houseNumber: '',
    street: '',
    description: ''
  },
  customerAddresses: []
};
