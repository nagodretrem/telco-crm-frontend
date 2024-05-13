import { createAction, props } from "@ngrx/store";
import { CreateAddressRequest } from "../../../features/customer/models/requests/create-address-request";

export const setIndividualCustomerAddress = createAction(
    '[Individual Customer Address] set individual customer adress',
    props<{individualCustomerAddress:CreateAddressRequest}>()
)
