import { Component, h, Prop, State } from '@stencil/core';
import type { SearchNowConfig, SearchNowResult } from '../../types/search';
import { fetchSearchResults } from '../../services/search-api.service';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

@Component({
  tag: 'search-now',
  styleUrl: 'search-now.css',
  shadow: true,
})
export class SearchNow {
  @Prop() config!: SearchNowConfig;

  @State() query = '';
  @State() results: SearchNowResult[] = [];
  @State() loading = false;
  @State() error = '';

  debounceTimer?: number;

  private onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.query = input.value;
    this.error = '';

    clearTimeout(this.debounceTimer);

    const trimmedQuery = this.query.trim();

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      this.results = [];
      this.loading = false;
      return;
    }

    this.loading = true;

    this.debounceTimer = setTimeout(async () => {
      await this.loadResults();
    }, DEBOUNCE_MS);
  };

  private async loadResults() {
    try {
      const trimmedQuery = this.query.trim();

      if (trimmedQuery.length < MIN_QUERY_LENGTH) {
        this.results = [];
        this.loading = false;
        return;
      }

      this.results = await fetchSearchResults(this.config, trimmedQuery);
    } catch (error) {
      this.results = [];
      this.error = 'Failed to load search results';
    } finally {
      this.loading = false;
    }
  }

  private clearSearch = () => {
    this.query = '';
    this.results = [];
    this.error = '';
    this.loading = false;
  };

  private highlightText(text?: string) {
    if (!text) return text;

    const query = this.query.trim();
    if (!query) return text;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

    return parts.map((part) =>
      part.toLowerCase() === query.toLowerCase() ? <mark>{part}</mark> : part
    );
  }

  render() {
    const hasQuery = this.query.trim().length > 0;
    const canSearch = this.query.trim().length >= MIN_QUERY_LENGTH;

    return (
      <div class="search-now">
        <h2>{this.config.title}</h2>

        <div class="search-box">
          <input
            type="text"
            value={this.query}
            placeholder={this.config.placeholder}
            onInput={this.onChange}
          />

          {hasQuery && (
            <button type="button" onClick={this.clearSearch}>
              Clear
            </button>
          )}
        </div>

        {!canSearch && hasQuery && (
          <p class="pre-condition">Type at least {MIN_QUERY_LENGTH} characters</p>
        )}

        {this.loading && <p class="loading">Loading...</p>}

        {!this.loading && this.error && <p class="error">{this.error}</p>}

        {!this.loading && canSearch && !this.error && this.results.length === 0 && (
          <p class="no-results">No results found</p>
        )}

        {!this.loading && this.results.length > 0 && (
          <ul>
            {this.results.map((result) => (
              <li key={result.id} class="result-item">
                <button type="button" class="result-button">
                  <div class="result-row">
                    <span class="result-label">{this.config.labels.titleLabel}:</span>
                    <span class="result-value">{this.highlightText(result.title)}</span>
                  </div>

                  {result.subtitle && this.config.labels.subtitleLabel && (
                    <div class="result-row">
                      <span class="result-label">{this.config.labels.subtitleLabel}:</span>
                      <span class="result-value">{this.highlightText(result.subtitle)}</span>
                    </div>
                  )}

                  {result.description && this.config.labels.descriptionLabel && (
                    <div class="result-row">
                      <span class="result-label">{this.config.labels.descriptionLabel}:</span>
                      <span class="result-value">{this.highlightText(result.description)}</span>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}