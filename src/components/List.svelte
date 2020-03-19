<script>
  import { useStoreon } from '@storeon/svelte';

  import Empty from './Empty.svelte';
  import Item from './Item.svelte';

  const { items, dispatch } = useStoreon('items');
</script>

<ul class="list">
{#if $items.length > 0}
  {#each $items as data (data.id)}
    <Item
      {data}
      {dispatch}
    />
  {/each}
{:else}
  <Empty />
{/if}
</ul>

<style>
  .list {
    list-style: none;
    padding: 0;
    margin: 16px 0;
  }
</style>
