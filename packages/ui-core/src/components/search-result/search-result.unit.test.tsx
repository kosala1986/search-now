import { describe, expect, h, it, render } from '@stencil/vitest';

describe('search-result', () => {
    it('renders labels and values', async () => {
        const { root } = await render(
            <search-result
                result={{
                    id: 'C001',
                    title: 'John Tan',
                    subtitle: 'CIF10001',
                    description: 'john.tan@email.com',
                }}
                labels={{
                    titleLabel: 'Full Name',
                    subtitleLabel: 'CIF',
                    descriptionLabel: 'Email',
                }}
                query="john"
                optionId="search-result-C001"
            ></search-result>
        );

        const text = root.shadowRoot?.textContent ?? '';

        expect(text).toContain('Full Name');
        expect(text).toContain('John Tan');
        expect(text).toContain('CIF10001');
        expect(text).toContain('john.tan@email.com');
    });

    it('highlights matched text', async () => {
        const { root } = await render(
            <search-result
                result={{
                    id: 'C001',
                    title: 'John Tan',
                }}
                labels={{
                    titleLabel: 'Full Name',
                }}
                query="john"
                optionId="search-result-C001"
            ></search-result>
        );

        const mark = root.shadowRoot?.querySelector('mark');
        
        expect(mark).not.toBeNull();
        expect(mark?.textContent).toBe('John');
    });
});
