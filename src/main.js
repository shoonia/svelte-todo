import App from './App.svelte';
import { store } from './store';

class Todo extends HTMLElement {
  connectedCallback() {
    new App({
      target: this,
      props: { store },
    });
  }
}

window.customElements.define('todo-app', Todo);
