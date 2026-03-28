import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HelloWorld } from '../../../../packages/angular-wrapper/src/directives/proxies';

@Component({
  selector: 'app-root',
  imports: [HelloWorld],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  onButtonClicked(event: CustomEvent<string>) {
    console.log('Angular received:', event.detail);
  }
}
