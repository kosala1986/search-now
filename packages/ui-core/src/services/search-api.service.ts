import type { SearchResultItem } from '../types/search';
import { CONFIG } from '../config';


export const searchResults = async (query: string): Promise<SearchResultItem[]> => {
  const baseUrl = CONFIG.api.endpoints.search;
  const url = query ? `${baseUrl}?q=${query}` : baseUrl;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  return response.json();
};