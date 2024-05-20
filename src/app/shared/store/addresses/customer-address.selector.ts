import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerAddressState } from "./customer-address.state";



const selectCustomerAddressesState =
  createFeatureSelector<CustomerAddressState>('customerAddress');


  export const selectCustomerAddresses = createSelector(
    selectCustomerAddressesState,
    (state: CustomerAddressState) => state.customerAddresses
  );
