import { SearchContext, type SearchNowConfig } from '../types/search';

export const accountSearchConfig: SearchNowConfig = {
    context: SearchContext.Accounts,
    title: 'Search Accounts',
    buttonLabel: 'Clear',
    placeholder: 'Search by account name',
    filters: [
        { id: 'all', label: 'All', value: 'all', isDefault: true },
        { id: 'active', label: 'Active', value: 'Active' },
        { id: 'dormant', label: 'Dormant', value: 'Dormant' },
        { id: 'frozen', label: 'Frozen', value: 'Frozen' },
        { id: 'matured', label: 'Matured', value: 'Matured' },
        { id: 'locked', label: 'Locked', value: 'Locked' },
    ],
    api: {
        searchUrl: 'http://localhost:3001/accounts',
        method: 'GET',
        queryParam: 'q',
        filterParam: 'status',
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