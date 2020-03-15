<script>
  export let onClick;
</script>

<button
  type="button"
  class="btn"
  on:click={onClick}
>
  <slot />
</button>

<style>
  .btn {
    cursor: pointer;
  }
</style>
