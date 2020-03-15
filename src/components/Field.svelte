<script>
  import { getStore } from '@storeon/svelte';

  let value = '';

  const { dispatch } = getStore();

  const addItem = ({ keyCode }) => {
    if (keyCode === 13 && value.trim() !== '') {
      dispatch('items/add', value);
      value = '';
    }
  };
</script>

<input
  type="text"
  class="field"
  bind:value={value}
  on:keypress={addItem}
/>

<style>
  .field {
    width: 100%;
  }
</style>
