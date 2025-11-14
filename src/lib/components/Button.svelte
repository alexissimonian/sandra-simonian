<script lang="ts">
  let {
    children,
    type = "button" as "button" | "submit" | "reset",
    ...otherProps
  } = $props();
</script>

<button {type} {...otherProps}>
  {@render children()}
</button>

<style lang="scss">
  button {
    background-color: $orange;
    color: $white;
    cursor: pointer;
    border: 0px;
    padding: 0.75em 1em;
    border-radius: 7px;
    font-weight: 500;
  }

  button:hover {
    background-color: $light-orange;
  }
</style>
