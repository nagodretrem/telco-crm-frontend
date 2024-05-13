import { createReducer, on } from "@ngrx/store";
import { initialIndividualCustomerState } from "./indivudual-customer.state";
import { setIndividualCustomer } from "./indivudual-customer.action";

export const individualCustomerReducer = createReducer(
  initialIndividualCustomerState,
  on(setIndividualCustomer, (state, { individualCustomer }) => ({
    ...state,
    individualCustomer: {
      ...individualCustomer,
    },
  }))
);




