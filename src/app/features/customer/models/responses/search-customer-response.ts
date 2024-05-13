
export interface SearchCustomerResponse {
  content: Content[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}

export interface Content {
  customerId: string
  firstName: string
  middleName: string
  lastName: string
  nationalityId: string
}

/* export interface Content {
  nationalityId: string;
  customerId: string;
  accountNumber: string;
  firstName: string;
  secondName: string;
  lastName: string;
  orderNumber: string;
} */
