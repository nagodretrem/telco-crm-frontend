
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

