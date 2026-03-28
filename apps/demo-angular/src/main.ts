import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { defineCustomElements } from '@search-now/ui-core/loader';
import { App } from './app/app';

defineCustomElements();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
