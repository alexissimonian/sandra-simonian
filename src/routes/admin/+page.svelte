<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data);
</script>

<svelte:head>
  <title>Admin center</title>
</svelte:head>

<div class="faux-body">
  <h2>Hello, {data.profile?.firstname}</h2>
</div>
