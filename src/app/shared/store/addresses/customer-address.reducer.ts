import { createReducer, on } from "@ngrx/store";
import { setIndividualCustomerAddress } from "./customer-address.action";
import { initialIndividualCustomerAddressState} from "./customer-address.state";



export const individualCustomerAddressReducer = createReducer(
    initialIndividualCustomerAddressState,
    on(setIndividualCustomerAddress, (state, { individualCustomerAddress }) => ({
      ...state,
      individualCustomerAddress: {
        ...individualCustomerAddress,
      },
    }))
  );