<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Admin center</title>
</svelte:head>

<h1 class="sr-only">Sandra Simonian - Admin Center</h1>
<div class="faux-body">
  <h2>Hello, {data.profile?.firstname}</h2>
</div>
