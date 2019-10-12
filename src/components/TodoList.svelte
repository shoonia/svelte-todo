<script>
  import { createEventDispatcher } from 'svelte';
  import TodoItem from './TodoItem.svelte';

  export let items;

  const dispatch = createEventDispatcher();

  function remove({ target }) {
    dispatch('remove', target.dataset.id);
  }

</script>

<style>
  .list {
    list-style: none;
    padding: 0;
  }
</style>

<ul class="list">
  {#each items as data}
    <TodoItem
      {data}
      {remove}
    />
  {/each}
</ul>
