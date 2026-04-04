export interface SearchFilterConfig {
  id: string;
  label: string;
  value: string;
  isDefault?: boolean;
}

export interface SearchResultMappingConfig {
  idField: string;
  titleField: string;
  subtitleField?: string;
  descriptionField?: string;
}

export interface SearchResultLabelsConfig {
  titleLabel: string;
  subtitleLabel?: string;
  descriptionLabel?: string;
}

export interface SearchApiConfig {
  searchUrl: string;
  method?: 'GET' | 'POST';
  queryParam?: string;
  filterParam?: string;
}

export interface SearchNowConfig {
  context: string;
  title: string;
  placeholder: string;
  buttonLabel?: string;
  filters?: SearchFilterConfig[];
  api: SearchApiConfig;
  mapping: SearchResultMappingConfig;
  labels: SearchResultLabelsConfig;
}

export interface SearchNowResult {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}