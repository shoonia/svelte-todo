<script>
  import { provideStoreon } from '@storeon/svelte';

  import Field from './components/Field.svelte';
  import List from './components/List.svelte';

  export let store;

  provideStoreon(store);
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
