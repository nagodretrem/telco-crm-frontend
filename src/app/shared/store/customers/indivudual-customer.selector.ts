import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IndividualCustomerState } from "./indivudual-customer.state";

const selectIndividualCustomerState =
  createFeatureSelector<IndividualCustomerState>('individualCustomer');



export const selectIndividualCustomer = createSelector(
    selectIndividualCustomerState,
    (state: IndividualCustomerState) => state.individualCustomer
  );
