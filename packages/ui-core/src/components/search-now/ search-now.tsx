import { Component, h, State } from '@stencil/core';
import { searchResults } from '../../services/search-api.service';
import type { SearchResultItem } from '../../types/search';

@Component({
  tag: 'search-now',
  styleUrl: 'search-now.css',
  shadow: true,
})
export class SearchNow {
  @State() query: string = '';
  @State() results: SearchResultItem[] = [];
  @State() loading: boolean = false;
  @State() error: string = '';

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.query = target.value;
  };

  private handleSearch = async () => {
    this.loading = true;
    this.error = '';

    try {
      this.results = await searchResults(this.query);
    } catch (error) {
      this.error = 'Something went wrong while fetching results';
      this.results = [];
    } finally {
      this.loading = false;
    }
  };

  render() {
    return (
      <div class="search-now-wrapper">

        <div class="search-bar">
          <input
            type="text"
            value={this.query}
            onInput={this.handleInput}
            placeholder="Search banking products..."
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>

        {this.loading && <p>Loading...</p>}

        {this.error && <p class="error">{this.error}</p>}

        {!this.loading && !this.error && this.results.length === 0 && (
          <p>No results found</p>
        )}

        <ul class="results-list">
          {this.results.map((item) => (
            <li key={item.id} class="result-card">
              <h3>{item.title}</h3>
              <p class="category">{item.category}</p>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}