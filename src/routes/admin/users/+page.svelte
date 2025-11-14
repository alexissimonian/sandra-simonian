<script>
  import Button from "$lib/components/Button.svelte";
</script>

<svelte:head>
  <title>Admin - Gestion des Utilisateurs</title>
</svelte:head>

<div class="faux-body">
  <h2>Nos Utilisateurs</h2>
  <Button id="user-create-button">Créer un utilisateur</Button>
</div>

<style lang="scss">
  #user-create-button {
    align-self: flex-end;
  }
</style>
