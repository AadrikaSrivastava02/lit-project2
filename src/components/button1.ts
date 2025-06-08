import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-button')
export class MyButton extends LitElement {
  @property({ type: String }) color: string = 'blue'; // default color
  @property({ type:Boolean }) disable: boolean =false;
  @property({ type:String }) shape: string=' rounded';
  @property({ type: String }) label: string= 'Click Me';
  static styles = css`
    button {
      padding: 10px 20px;
      font-size: 35px;
      color: red;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }   
    button.rounded{
        border-radius: 8px;
    }
    button.square{
        border-radius:0;
    }
    button.pill{
        border-radius:50px;
    }
  `;

  render() {
    return html`
      <button 
      class=${this.shape}
      style="background-color: ${this.color};"
      ?disabled=${this.disable}
      >
        ${this.label}
      </button>
    `;
  }
}
