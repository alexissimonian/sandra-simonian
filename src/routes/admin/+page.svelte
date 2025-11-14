<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/Button.svelte";
</script>

<h1>Admin Page</h1>
<Button onclick={() => goto(page.url.pathname + "/users")}>Utilisateurs</Button>
