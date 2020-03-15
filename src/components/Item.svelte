<script>
  export let data;
  export let dispatch;

  const editItem = () => {
    dispatch('items/edit', data.id);
  };

  const removeItem = () => {
    dispatch('items/remove', data.id);
  };

  const updateItem = ({ keyCode, target }) => {
    if (keyCode === 13 && target.value.trim() !== '') {
      dispatch('items/update', { id: data.id, text: target.value });
    }
  };
</script>

{#if data.isEdit}
  <input
    type="text"
    value={data.text}
    on:keypress={updateItem}
  />
{:else}
<li>
  <span>
    {data.text}
  </span>
  <button
    type="button"
    on:click={editItem}
  >
    edit
  </button>
  <button
    type="button"
    on:click={removeItem}
  >
    remove
  </button>
</li>
{/if}
