import type { ComponentProps } from 'react';
import { SearchNow } from '@search-now/react-wrapper';

type SearchNowConfig = ComponentProps<typeof SearchNow>['config'];

export const customerSearchConfig: SearchNowConfig = {
  context: 'customers',
  title: 'Search Customers',
  placeholder: 'Search by customer name',
  buttonLabel: 'Clear',
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
