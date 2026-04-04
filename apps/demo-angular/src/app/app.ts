import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchNow } from '../../../../packages/angular-wrapper/src/directives/proxies';
import { accountSearchConfig } from './account-search-config';

@Component({
  selector: 'app-root',
  imports: [SearchNow],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly accountSearchConfig = accountSearchConfig;
  theme: 'light' | 'dark' = 'light';

  onResultSelect(event: CustomEvent) {
    console.log('Angular received:', event.detail);
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
  }
}
