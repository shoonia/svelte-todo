<script>
  import Button from './Button.svelte';

  export let data;
  export let dispatch;

  const editItem = () => {
    dispatch('items/openEdit', data.id);
  };

  const closeEdit = () => {
    dispatch('items/closeEdit', data.id);
  };

  const removeItem = () => {
    dispatch('items/remove', data.id);
  };

  const updateItem = ({ keyCode, target }) => {
    if (keyCode === 13 && target.value.trim() !== '') {
      dispatch('items/update', { id: data.id, text: target.value });
    }
  };

  const setFocuse = (input) => {
    input.focus();
  };
</script>

{#if data.isEdit}
  <input
    type="text"
    value={data.text}
    on:keypress={updateItem}
    on:blur={closeEdit}
    use:setFocuse
  />
{:else}
<li>
  <span>
    {data.text}
  </span>
  <Button onClick={editItem}>
    edit
  </Button>
  <Button onClick={removeItem}>
    remove
  </Button>
</li>
{/if}
