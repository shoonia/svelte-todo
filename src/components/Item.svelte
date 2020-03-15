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

<li class="item">
{#if data.isEdit}
  <input
    type="text"
    class="edit"
    value={data.text}
    on:keypress={updateItem}
    on:blur={closeEdit}
    use:setFocuse
  />
  <Button>
    Close
  </Button>
{:else}
  <span>
    {data.text}
  </span>
  <div>
    <Button onClick={editItem}>
    edit
    </Button>
    <Button onClick={removeItem}>
      remove
    </Button>
  </div>
{/if}
</li>

<style>
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 5px 15px;
    margin: 5px 0;
  }

  .edit {
    width: 100%;
    margin-right: 5px;
  }
</style>
