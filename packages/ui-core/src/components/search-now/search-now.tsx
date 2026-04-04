import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import type { SearchNowConfig, SearchNowResult } from '../../types/search';
import { fetchSearchResults } from '../../services/search-api.service';
import { SEARCH_NOW_MESSAGES } from './search-now.constants';

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
  @State() selectedFilter = '';
  @State() isDropdownOpen = false;
  @State() activeIndex = -1;
  @Event() resultSelect!: EventEmitter<SearchNowResult>;

  dropdownId = 'search-now-results';

  debounceTimer?: number;

  componentWillLoad() {
    const defaultFilter = this.config.filters?.find((filter) => filter.isDefault);
    this.selectedFilter = defaultFilter?.value ?? '';
  }

  onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.query = input.value;
    this.error = '';

    clearTimeout(this.debounceTimer);

    const trimmedQuery = this.query.trim();

    this.isDropdownOpen = true;
    this.activeIndex = -1;

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

  async loadResults() {
    try {
      const trimmedQuery = this.query.trim();

      if (trimmedQuery.length < MIN_QUERY_LENGTH) {
        this.results = [];
        this.loading = false;
        return;
      }

      this.results = await fetchSearchResults(
        this.config,
        trimmedQuery,
        this.selectedFilter
      );
    } catch (error) {
      this.results = [];
      this.error = SEARCH_NOW_MESSAGES.loadError;
    } finally {
      this.loading = false;
    }
  }

  onFilterClick = async (filterValue: string) => {
    this.selectedFilter = filterValue;

    if (this.query.trim().length >= MIN_QUERY_LENGTH) {
      this.loading = true;
      await this.loadResults();
    }
  };

  clearSearch = () => {
    this.query = '';
    this.results = [];
    this.error = '';
    this.loading = false;
    this.isDropdownOpen = false;
    this.activeIndex = -1;
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.isDropdownOpen || this.results.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex =
          this.activeIndex < this.results.length - 1 ? this.activeIndex + 1 : 0;
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex =
          this.activeIndex > 0 ? this.activeIndex - 1 : this.results.length - 1;
        break;

      case 'Enter':
        event.preventDefault();
        if (this.activeIndex >= 0) {
          this.onResultSelect(this.results[this.activeIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.isDropdownOpen = false;
        this.activeIndex = -1;
        break;
    }
  };

  onResultSelect(result: SearchNowResult) {
    this.query = result.title;
    this.isDropdownOpen = false;
    this.activeIndex = -1;
    
    this.resultSelect.emit(result);
  }

  render() {
    const hasQuery = this.query.trim().length > 0;
    const canSearch = this.query.trim().length >= MIN_QUERY_LENGTH;

    return (
      <section class="search-now">
        <h2>{this.config.title}</h2>

        <div class="search-box">
          <input
            type="text"
            value={this.query}
            placeholder={this.config.placeholder}
            onInput={this.onChange}
            onKeyDown={this.onKeyDown}
            onFocus={() => (this.isDropdownOpen = true)}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={this.isDropdownOpen ? 'true' : 'false'}
            aria-controls={this.dropdownId}
          />

          {hasQuery && (
            <button type="button" onClick={this.clearSearch}>
              {this.config.buttonLabel || SEARCH_NOW_MESSAGES.clearButton}
            </button>
          )}
        </div>
        {this.config.filters && this.config.filters.length > 0 && (
          <section class="filters">
            {this.config.filters.map((filter) => (
              <button
                type="button"
                class={{
                  'filter-button': true,
                  active: this.selectedFilter === filter.value,
                }}
                onClick={() => this.onFilterClick(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </section>
        )}

        {!canSearch && hasQuery && (
          <p class="pre-condition">Type at least {MIN_QUERY_LENGTH} characters</p>
        )}

        {this.loading && <p class="loading">{SEARCH_NOW_MESSAGES.loading}</p>}

        {!this.loading && this.error && <p class="error">{this.error}</p>}

        {!this.loading && canSearch && !this.error && this.results.length === 0 && (
          <p class="no-results">{SEARCH_NOW_MESSAGES.noResults}</p>
        )}

        {this.isDropdownOpen && !this.loading && this.results.length > 0 && (
          <ul
            id={this.dropdownId}
            class="results-dropdown"
            role="listbox"
          >
            {this.results.map((result, index) => (
              <search-result
                key={result.id}
                optionId={`search-result-${result.id}`}
                result={result}
                labels={this.config.labels}
                query={this.query}
                active={this.activeIndex === index}
                onClick={() => this.onResultSelect(result)}
              ></search-result>
            ))}
          </ul>
        )}
      </section>
    );
  }
}
