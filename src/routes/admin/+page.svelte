<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
</script>

<h1>Admin Page</h1>
<button onclick={() => goto(page.url.pathname + "/users")}>Utilisateurs</button>
