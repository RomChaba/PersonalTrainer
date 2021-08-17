class ProgressRing extends HTMLElement {
    constructor() {
        super();
        const stroke = this.getAttribute('stroke');
        const radius = this.getAttribute('radius');
        const strokeColor = this.getAttribute('strokeColor');
        const normalizedRadius = radius - stroke * 2;
        this._circumference = normalizedRadius * 2 * Math.PI;

        this._root = this.attachShadow({mode: 'open'});
        this._root.innerHTML = `
      <svg
        height="${radius * 2}"
        width="${radius * 2}"
       >

         <circle
           stroke="#f2f2f2"
           stroke-width="${stroke}"
           fill="transparent"
           r="${normalizedRadius}"
           cx="${radius}"
           cy="${radius}"
        />
         <circle
           class="loadingBar"
           stroke="${strokeColor}"
           stroke-dasharray="${this._circumference} ${this._circumference}"
           style="stroke-dashoffset:${this._circumference}"
           stroke-width="${stroke}"
           fill="transparent"
           r="${normalizedRadius}"
           cx="${radius}"
           cy="${radius}"
        />
      </svg>

      <style>
        .loadingBar {
          transition: stroke-dashoffset 1.5s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          stroke-linecap: round;
        }
      </style>
    `;
    }

    setProgress(percent) {
        const offset = this._circumference - (percent / 100 * this._circumference);
        const circle = this._root.querySelector('.loadingBar');
        circle.style.strokeDashoffset = offset;
    }

    static get observedAttributes() {
        return ['progress'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'progress') {
            this.setProgress(newValue);
        }
    }
}