<script>
  export let onClick;
</script>

<button
  type="button"
  on:click={onClick}
>
  <slot />
</button>

<style>
  button {
    cursor: pointer;
  }
</style>
