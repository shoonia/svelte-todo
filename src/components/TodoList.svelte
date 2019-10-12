<script>
  import { createEventDispatcher } from 'svelte';
  import TodoItem from './TodoItem.svelte';

  export let items;

  const dispatch = createEventDispatcher();

  function remove({ target }) {
    dispatch('remove', target.dataset.id);
  }

  function edit({ target }) {
    dispatch('edit', target.dataset.id);
  }

</script>

<ul>
  {#each items as data}
    <TodoItem
      {data}
      {remove}
      {edit}
    />
  {/each}
</ul>
