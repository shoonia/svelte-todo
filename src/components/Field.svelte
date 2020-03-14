<script>
  import { getStore } from '@storeon/svelte';

  let value = '';

  const { dispatch } = getStore();

  const addItem = ({ keyCode }) => {
    if (keyCode === 13) {
      dispatch('items/add', value);
      value = '';
    }
  };
</script>

<input
  type="text"
  bind:value={value}
  on:keypress={addItem}
/>
