import { SearchContext, type SearchNowConfig } from '../types/search';

export const customerSearchConfig: SearchNowConfig = {
  context: SearchContext.Customers,
  title: 'Search Customers',
  placeholder: 'Search by customer name',
  filters: [
    { id: 'all', label: 'All', value: 'all', isDefault: true },
    { id: 'retail', label: 'Retail', value: 'retail' },
    { id: 'corporate', label: 'Corporate', value: 'corporate' },
  ],
  api: {
    searchUrl: 'http://localhost:3001/customers',
    method: 'GET',
    queryParam: 'q',
    filterParam: 'segment',
  },
  mapping: {
    idField: 'customerId',
    titleField: 'fullName',
    subtitleField: 'cif',
    descriptionField: 'email',
  },
  labels: {
    titleLabel: 'Full Name',
    subtitleLabel: 'CIF',
    descriptionLabel: 'Email',
  },
};