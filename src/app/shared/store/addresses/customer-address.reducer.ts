import { createReducer, on } from "@ngrx/store";
import { initialCustomerAddressState } from "./customer-address.state";
import { setCustomerAddress, setCustomerAddresses, deleteCustomerAddress, updateCustomerAddress, clearCustomerAddresses } from "./customer-address.action";

export const customerAddressReducer = createReducer(
  initialCustomerAddressState,
  on(setCustomerAddress, (state, { customerAddress }) => ({
    ...state,
    customerAddress
  })),
  on(setCustomerAddresses, (state, { customerAddresses }) => ({
    ...state,
    customerAddresses: [...state.customerAddresses, ...customerAddresses],
  })),
  on(deleteCustomerAddress, (state, { addressId }) => ({
    ...state,
    customerAddresses: state.customerAddresses.filter(address => address.addressId !== addressId)
  })),
  on(updateCustomerAddress, (state, { customerAddress }) => ({
    ...state,
    customerAddresses: state.customerAddresses.map(address =>
      address.addressId === customerAddress.addressId ? customerAddress : address
    )
  })),
  on(clearCustomerAddresses, (state) => ({
    ...state,
    customerAddresses: [],
    customerAddress: null
  }))
);
