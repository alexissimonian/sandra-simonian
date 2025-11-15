<script lang="ts">
  import { Button } from "@svar-ui/svelte-core";

  let {
    children,
    type = "primary" as
      | "primary"
      | "secondary"
      | "link"
      | "danger"
      | "primary block"
      | "secondary block"
      | "link block"
      | "danger block"
      | undefined,
    ...otherProps
  } = $props();
</script>

<Button {type} {...otherProps}>
  {@render children()}
</Button>

<style lang="scss">
</style>
