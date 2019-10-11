<script>
  import TodoItem from "./TodoItem.svelte";

  export let items;
  export let removeItem;
</script>

<ul>
  {#each items as data}
    <TodoItem
      {data}
      on:remove={removeItem}
    />
  {/each}
</ul>
