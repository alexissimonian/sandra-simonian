<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Bienvenue sur votre espace coaching</title>
</svelte:head>

<h1 class="sr-only">Bienvenue sur votre espace coaching</h1>
<h2>Bienvenue {data.profile?.firstname}</h2>
