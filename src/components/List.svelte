<script>
  import { getStore } from '@storeon/svelte';

  import Item from './Item.svelte';

  const { items } = getStore('items');

</script>

<ul>
  {#each $items as { text }}
    <Item text={text} />
  {/each}
</ul>
