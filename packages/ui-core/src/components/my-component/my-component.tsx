import { Component, h } from '@stencil/core';
import { customerSearchConfig } from '../../config/customer-search-config';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  // private handleButtonClicked = (event: CustomEvent<string>) => {
  //   console.log('Button clicked:', event.detail);
  // };

  render() {
    return (
      // <hello-world
      //   message="Hello from ui-core"
      //   onButtonClicked={this.handleButtonClicked}
      // ></hello-world>
      <div>
        <search-now config={customerSearchConfig}></search-now>
      </div>
    );
  }
}
