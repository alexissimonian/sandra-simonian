<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { Willow } from "@svar-ui/svelte-core";
  import "../app.scss";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Willow>
  <div class="app-wrapper">
    {@render children()}
  </div>
</Willow>
