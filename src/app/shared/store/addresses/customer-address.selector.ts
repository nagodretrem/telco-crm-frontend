import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerAddressState } from "./customer-address.state";



const selectCustomerAddressState =
  createFeatureSelector<CustomerAddressState>('customerAddress');


  export const selectCustomerAddress = createSelector(
  selectCustomerAddressState,
  (state: CustomerAddressState) => ({customerAddress: state.customerAddress, customerAddresses: state.customerAddresses})
);
