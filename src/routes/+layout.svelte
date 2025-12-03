<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import { Globals, Willow as WillowCore } from "@svar-ui/svelte-core";
  import { Willow as WillowGrid } from "@svar-ui/svelte-grid";
  import "../app.scss";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<WillowCore>
  <WillowGrid>
    <Globals>
      <div class="app-wrapper">
        {@render children()}
      </div>
    </Globals>
  </WillowGrid>
</WillowCore>
