class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <nav class="teal black" role="navigation">
     <div class="nav-wrapper container">
          <a id="logo-container" href="#" class="brand-logo">FL1 App</a>
          <a href="#" data-target="nav-mobile" class="sidenav-trigger">&#9776;</a>

          <ul class="topnav right hide-on-med-and-down"></ul>
          <ul id="nav-mobile" class="sidenav"></ul>
     </div>
     </nav>
     `;
  }
}

customElements.define("nav-bar", Navbar);
