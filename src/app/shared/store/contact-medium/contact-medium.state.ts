import { CreateContactMediumRequest } from "../../../features/customer/models/requests/create-contact-medium-request";

export interface ContactMediumState {
  contactMedium: CreateContactMediumRequest;
}

export const initialContactMediumState: ContactMediumState = {
  contactMedium: {
    customerId : null,
    email: '',
    homePhone: '',
    mobilePhone: '',
    fax: '',
  },
};
