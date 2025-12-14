<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>Bienvenue sur votre espace coaching</title>
</svelte:head>

<div class="faux-body">
  <h1>Bienvenue, {data.profile?.firstname}</h1>
</div>
