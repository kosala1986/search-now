import type { SearchNow } from '../../../../packages/angular-wrapper/src/directives/proxies';

type SearchNowConfig = SearchNow['config'];

export const accountSearchConfig: SearchNowConfig = {
  context: 'accounts',
  title: 'Search Accounts',
  placeholder: 'Search by account name',
  buttonLabel: 'Clear',
  filters: [
    { id: 'all', label: 'All', value: 'all', isDefault: true },
    { id: 'savings', label: 'Savings', value: 'savings' },
    { id: 'current', label: 'Current', value: 'current' },
    { id: 'fixed-deposit', label: 'Fixed Deposit', value: 'fixed-deposit' },
  ],
  api: {
    searchUrl: 'http://localhost:3001/accounts',
    method: 'GET',
    queryParam: 'q',
    filterParam: 'accountType',
  },
  mapping: {
    idField: 'accountId',
    titleField: 'accountName',
    subtitleField: 'accountNumber',
    descriptionField: 'status',
  },
  labels: {
    titleLabel: 'Account Name',
    subtitleLabel: 'Account Number',
    descriptionLabel: 'Status',
  },
};
