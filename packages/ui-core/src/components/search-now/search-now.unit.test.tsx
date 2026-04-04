import { describe, expect, h, it, render } from '@stencil/vitest';
import { SearchContext, type SearchNowConfig } from '../../types/search';

describe('search-now', () => {
    const config: SearchNowConfig = {
        context: SearchContext.Customers,
        title: 'Search Customers',
        placeholder: 'Search by customer name',
        filters: [
            { id: 'all', label: 'All', value: 'all', isDefault: true },
            { id: 'retail', label: 'Retail', value: 'retail' },
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

    it('renders title, input, and filters', async () => {
        const { root } = await render(<search-now config={config}></search-now>);

        const shadow = root.shadowRoot!;
        
        expect(shadow.querySelector('h2')?.textContent).toBe('Search Customers');
        expect(shadow.querySelector('input')?.getAttribute('placeholder')).toBe(
            'Search by customer name'
        );
        expect(shadow.querySelectorAll('.filter-button').length).toBe(2);
    });

    it('sets default filter', async () => {
        const { root } = await render(<search-now config={config}></search-now>);
        const activeFilter = root.shadowRoot?.querySelector('.filter-button.active');

        expect(activeFilter?.textContent?.trim()).toBe('All');
    });
});
