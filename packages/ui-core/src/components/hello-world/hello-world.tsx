import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css',
  shadow: true,
})
export class HelloWorld {
  @Prop() message: string = 'Hello from Stencil';

  @Event() buttonClicked: EventEmitter<string>;

  private handleClick = () => {
    this.buttonClicked.emit('Hello button clicked');
  };

  render() {
    return (
      <div class="wrapper">
        <h2>Hello World Component</h2>
        <p>{this.message}</p>
        <button onClick={this.handleClick} aria-label="Click button">Click me</button>
      </div>
    );
  }
}
