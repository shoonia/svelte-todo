<script>
  import { createEventDispatcher } from "svelte";

  export let data;

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", data.id);
  }
</script>

<li>
  <span>
    {data.text}
  </span>
  <button 
    type="button"
    on:click={remove}
  >
    Remove
  </button>
</li>
