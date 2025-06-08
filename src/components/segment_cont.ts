import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Segment {
    label: string;
    value: string;
    sublabel?: string;
    disabled?: boolean;
    
}

@customElement('segmented-control1')
export class SegmentedControl extends LitElement {
    @property({ type: String }) name = 'segmented-control';
    
    @property({
        attribute: 'segments',
        type: Array, converter(value) {
            try {
                return JSON.parse(value!);
            }
            catch (error) {
                return [];
            }
        }
    }) segments: Segment[] = [];
    // @property({type:Boolean, reflect:true}) disabled=false;
    @property({ type: Number }) defaultIndex = 0;
    @property({ type: String }) size = '';
    @property({ type: Boolean }) disable=false;
    
    @property({type:Boolean}) hover=false;
    @property({ type: Boolean, reflect: true }) hoverPopup = false;
    @state() private hoverLabel: string | null = null;
    @state() private hoverIndex: number | null = null;
 
    @state() private activeIndex = 0;
    // @state() private hoverLabel: string | null =' ';

    static styles = css`
    :host{--segment_padding: 6px }
    :host([size='small']) .segment{ padding: 5px; font-size:12px;}
    :host([disable]) .segment{background-color: #ccc; color: #777;
     cursor: not-allowed; pointer-events: none;}
    :host([hover]) .segment{background-color: transparent;}
    .container {
      display:inline-flex;  
      border: 1px groove #a3a2a2;
      border-radius: 5px ;
      
    }
    .segment {
  display: inline-flex;   
  padding: var(--segment_padding);     
  text-align: center;
  cursor: pointer;
  /* user-select: none; */
  background-color: #eee;
  transition: background-color 0.3s;
  /* white-space: nowrap;   */
   font-family: 'Arial', sans-serif;
  flex-direction: column;        
}

    .segment.active {
  background-color: #d5d3d3;
  color: black;
  /* font-weight: bold; */
  border-radius: 2px;
  border: 1.5px groove gray;
  box-sizing: border-box;
}
.sublabel {
  font-weight: normal;
  font-size: 0.88em;
  color: #666;
  margin-top: 2px;
  text-align:left;
}
/* .segment:hover{
    background-color: #cce0ff;
} */
.hover-info{
    margin-top: 10px;
    font-size: 14px;
    color: #444;
}
.tooltip {
  position: absolute;
  background: #222;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  transform: translateY(-110%);
}

`;

    connectedCallback() {
        super.connectedCallback();
        this.activeIndex = this.defaultIndex;
    }

    private onSegmentClick(index: number) {
        this.activeIndex = index;
        const selected = this.segments[index];
        this.dispatchEvent(new CustomEvent('segment-change', {
            detail: { value: selected.value, index },
            bubbles: true,
            composed: true,
        }));
    }
    private mouseEnter(label: string, index: number) {
  this.hoverLabel = label;
  this.hoverIndex = index;
}

private mouseLeave = () => {
  this.hoverLabel = null;
  this.hoverIndex = null;
}

   render() {
  return html`
    <div class="container">
      ${this.segments.map(
        (segment, i) => html`
          <div
            class="segment ${i === this.activeIndex ? 'active' : ''}"
            @click=${() => !segment.disabled && this.onSegmentClick(i)}
            style=${segment.disabled
              ? 'pointer-events: none; color: #aaa; background:#f0f0f0;'
              : ''}
            @mouseenter=${() => this.mouseEnter(segment.label, i)}
            @mouseleave=${this.mouseLeave}
          >
            ${segment.label}
            <span class="sublabel">${segment?.sublabel ?? ''}</span>

            ${this.hoverPopup && this.hoverIndex === i && this.activeIndex === i
              ? html`<div class="tooltip">You are hovering on "${segment.label}"</div>`
              : null}
          </div>
        `
      )}
    </div>
  `;
}


}
