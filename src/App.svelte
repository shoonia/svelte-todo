<script>
  import { setStore } from '@storeon/svelte';

  import { store } from './store';
  import Field from './components/Field.svelte';
  import List from './components/List.svelte';

  setStore(store);
</script>

<style>
  .main {
    max-width: 700px;
    margin: 0 auto;
  }
</style>

<main class="main">
  <h1>Todo</h1>
  <Field />
  <List />
</main>
