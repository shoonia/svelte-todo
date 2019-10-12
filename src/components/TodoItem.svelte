<script>
  export let data;
  export let remove;
  export let edit;
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
    {#if data.edit}
      <input
        type="text"
        bind:value={data.text}
      />
    {:else}
      {data.text}
    {/if}
  </div>
  <div>
    <button
      type="button"
      data-id={data.id}
      on:click={edit}
    >
      {#if data.edit}
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
