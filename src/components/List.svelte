<script>
  import { getStore } from '@storeon/svelte';

  import Empty from './Empty.svelte';
  import Item from './Item.svelte';

  const { items, dispatch } = getStore('items');
</script>

<ul>
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
