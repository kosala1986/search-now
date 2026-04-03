import { SearchContext, type SearchNowConfig } from '../types/search';

export const customerSearchConfig: SearchNowConfig = {
    context: SearchContext.Customers,
    title: 'Search Customers',
    placeholder: 'Search by customer name or CIF',
    api: {
        searchUrl: 'http://localhost:3001/customers',
        method: 'GET',
        queryParam: 'q',
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