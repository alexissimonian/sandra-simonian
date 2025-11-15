<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "../app.scss";
  import { Willow } from "@svar-ui/svelte-core";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Willow>
  {@render children()}
</Willow>
