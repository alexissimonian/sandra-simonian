<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/Button.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Admin center</title>
</svelte:head>

<h1 class="sr-only">Sandra Simonian - Admin Center</h1>
<div class="faux-body">
  <h2>Hello, {data.profile?.name}</h2>
  <div class="buttons-containers">
    <Button onclick={() => goto("/app")}>App</Button>
    <Button onclick={() => goto(page.url.pathname + "/users")}
      >Utilisateurs</Button
    >
    <Button onclick={() => goto(page.url.pathname + "/rdv")}>RDV</Button>
  </div>
</div>

<style lang="scss">
  .buttons-containers {
    display: flex;
    gap: 1rem;
  }
</style>
