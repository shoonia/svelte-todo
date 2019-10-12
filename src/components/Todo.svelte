<script>
  import nanoid from 'nanoid/non-secure';
  import TodoList from './TodoList.svelte';

  let items = [];
  let text = '';
  let input = null;

  function addItem() {
    const item = {
      id: nanoid(),
      edit: false,
      text,
    };

    items = [item].concat(items);
    text = '';
    input.focus();
  }

  function removeItem({ detail: id }) {
    items = items.filter(item => item.id !== id);
  }

  function editItem({ detail: id }) {
    const item = items.find((el) => el.id === id);

    item.edit = !item.edit;
    items = items.slice();
  }

  function clickEnter({ keyCode }) {
    if (keyCode === 13) {
      addItem();
    }
  }
</script>

<div>
  <h1>Todo List</h1>
  <div>
    <input
      type="text"
      bind:value={text}
      bind:this={input}
      on:keypress={clickEnter}
    />
    <button 
      type="button"
      on:click={addItem}
    >
      Add
    </button>
  </div>

  {#if items.length < 1}
    <p>You don't have any tasks</p>
  {:else}
    <TodoList
      {items}
      on:remove={removeItem}
      on:edit={editItem}
    />
  {/if}
</div>
