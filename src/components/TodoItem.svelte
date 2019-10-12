<script>
  export let data;
  export let remove;

  let isEdit = false;

  function toggleEdit() {
    isEdit = !isEdit;
  }

  function clickEnter({ keyCode }) {
    if (keyCode === 13) {
      toggleEdit();
    }
  }

</script>

<style>
  .content {
    display: flex;
    justify-content: space-between;
  }
</style>

<li>
  <div class="content">
    <div>
      {#if isEdit}
        <input
          type="text"
          bind:value={data.text}
          on:keypress={clickEnter}
          autofocus
        />
      {:else}
        {data.text}
      {/if}
    </div>
    <div>
      <button
        type="button"
        data-id={data.id}
        on:click={toggleEdit}
      >
        {#if isEdit}
          Save
        {:else}
          Edit
        {/if}
      </button>
      <button 
        type="button"
        data-id={data.id}
        on:click={remove}
      >
        Remove
      </button>
    </div>
  </div>
</li>
