class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class="footer-copyright black">
               <div class="container center-align">
                    © 2020 Copyright Submission 2 PWA | Dicoding.com
               </div>
          </div>
          `;
  }
}

customElements.define("copy-right", Footer);
