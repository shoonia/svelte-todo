<script>
  import TodoList from "./TodoList.svelte";

  let items = [];
  let text = "";
  let input = null;

  function addItem() {
    items = items.concat({
      id: Date.now(),
      text
    });

    text = "";
    input.focus();
  }

  function removeItem({ detail: id }) {
    items = items.filter(item => item.id !== id);
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
      {removeItem}
    />
  {/if}

</div>
