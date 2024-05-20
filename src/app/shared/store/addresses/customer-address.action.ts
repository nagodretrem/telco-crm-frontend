import { createAction, props } from "@ngrx/store";
import { CreateAddressRequest } from "../../../features/customer/models/requests/create-address-request";

export const setCustomerAddress = createAction(
  '[Customer Address] Set Customer Address',
  props<{ customerAddress: CreateAddressRequest }>()
);

export const setCustomerAddresses = createAction(
  '[Customer Addresses] Set Customer Addresses',
  props<{ customerAddresses: CreateAddressRequest[] }>()
);

export const deleteCustomerAddress = createAction(
  '[Customer Addresses] Delete Customer Address',
  props<{ addressId: string }>()
);

export const updateCustomerAddress = createAction(
  '[Customer Addresses] Update Customer Address',
  props<{ customerAddress: CreateAddressRequest }>()
);
