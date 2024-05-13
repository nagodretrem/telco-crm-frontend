import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IndividualCustomerAddressState } from "./customer-address.state";

const selectIndividualCustomerAddressState=createFeatureSelector<IndividualCustomerAddressState>('individualCustomerAddress')

export const selectIndividualCustomerAddress=createSelector(
    selectIndividualCustomerAddressState,
    (state:IndividualCustomerAddressState)=>state.individualCustomerAddress
)
