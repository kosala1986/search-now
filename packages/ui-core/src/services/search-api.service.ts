import type { SearchNowConfig, SearchNowResult } from '../types/search';

export async function fetchSearchResults(
  config: SearchNowConfig,
  query: string
): Promise<SearchNowResult[]> {
  const method = config.api.method ?? 'GET';

  const url = new URL(config.api.searchUrl, window.location.origin);

  url.searchParams.set(`${config.mapping.titleField}:contains`, query);

  const response = await fetch(url.toString(), { method });

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await response.json();
  const items = Array.isArray(data) ? data : [];

  return items.map((item: Record<string, unknown>) => ({
    id: String(item[config.mapping.idField] ?? ''),
    title: String(item[config.mapping.titleField] ?? ''),
    subtitle: config.mapping.subtitleField
      ? String(item[config.mapping.subtitleField] ?? '')
      : undefined,
    description: config.mapping.descriptionField
      ? String(item[config.mapping.descriptionField] ?? '')
      : undefined,
  }));
}