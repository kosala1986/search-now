import { Component, h, Host, Prop } from '@stencil/core';
import type { SearchNowResult, SearchResultLabelsConfig } from '../../types/search';

@Component({
  tag: 'search-result',
  styleUrl: 'search-result.css',
  shadow: true,
})
export class SearchResult {
  @Prop() result!: SearchNowResult;
  @Prop() labels!: SearchResultLabelsConfig;
  @Prop() query = '';
  @Prop() active = false;
  @Prop() optionId!: string;

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
    return (
      <Host
        id={this.optionId}
        role="option"
        aria-selected={this.active ? 'true' : 'false'}
      >
        <li class="result-item">
          <button
            type="button"
            class={{
              'result-button': true,
              active: this.active,
            }}
          >
            <section class="result-row">
              <span class="result-label">{this.labels.titleLabel}:</span>
              <span class="result-value">{this.highlightText(this.result.title)}</span>
            </section>

            {this.result.subtitle && this.labels.subtitleLabel && (
              <section class="result-row">
                <span class="result-label">{this.labels.subtitleLabel}:</span>
                <span class="result-value">{this.highlightText(this.result.subtitle)}</span>
              </section>
            )}

            {this.result.description && this.labels.descriptionLabel && (
              <section class="result-row">
                <span class="result-label">{this.labels.descriptionLabel}:</span>
                <span class="result-value">{this.highlightText(this.result.description)}</span>
              </section>
            )}
          </button>
        </li>
      </Host>
    );
  }
}