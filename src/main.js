import App from './App.svelte';

class Todo extends HTMLElement {
  connectedCallback() {
    new App({ target: this });
  }
}

window.customElements.define('todo-app', Todo);
