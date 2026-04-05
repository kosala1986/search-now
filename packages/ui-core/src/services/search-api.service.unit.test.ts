import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchSearchResults } from './search-api.service';
import type { SearchNowConfig } from '../types/search';

const baseConfig: SearchNowConfig = {
  context: 'accounts',
  title: 'Search Accounts',
  placeholder: 'Search accounts',
  api: {
    searchUrl: 'http://localhost/accounts',
    method: 'GET',
    filterParam: 'status',
  },
  mapping: {
    idField: 'id',
    titleField: 'name',
    subtitleField: 'accountNumber',
    descriptionField: 'status',
  },
  labels: {
    titleLabel: 'Account Name',
    subtitleLabel: 'Account Number',
    descriptionLabel: 'Status',
  },
};

describe('fetchSearchResults', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      location: {
        origin: 'http://localhost',
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('builds the search request and maps response items', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Primary Savings',
          accountNumber: '123-456-789',
          status: 'Active',
        },
      ]),
    } as unknown as Response);

    const results = await fetchSearchResults(baseConfig, 'saving', 'active');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost/accounts?name%3Acontains=saving&status=active',
      { method: 'GET' }
    );
    expect(results).toEqual([
      {
        id: '1',
        title: 'Primary Savings',
        subtitle: '123-456-789',
        description: 'Active',
      },
    ]);
  });

  it('omits the filter query param when the selected filter is all', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    } as unknown as Response);

    await fetchSearchResults(baseConfig, 'saving', 'all');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost/accounts?name%3Acontains=saving',
      { method: 'GET' }
    );
  });

  it('throws when the response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: vi.fn(),
    } as unknown as Response);

    await expect(fetchSearchResults(baseConfig, 'saving')).rejects.toThrow(
      'Failed to fetch search results'
    );
  });

  it('returns an empty list when the response body is not an array', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ items: [] }),
    } as unknown as Response);

    await expect(fetchSearchResults(baseConfig, 'saving')).resolves.toEqual([]);
  });
});
