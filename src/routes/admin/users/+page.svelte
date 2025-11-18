<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { Grid } from "@svar-ui/svelte-grid";
  import type { PageData } from "./$types";

  export let data: PageData;
  let gridData: any[] = data.profiles;
  let gridColumns: any[] = [
    {
      id: "name",
      header: "Prénom",
      flexgrow: 1,
    },
    {
      id: "surname",
      header: "Nom",
      flexgrow: 1,
    },
    {
      id: "email",
      header: "Email",
      flexgrow: 1,
    },
    {
      id: "lastSignInDate",
      header: "Dernière Connexion",
      flexgrow: 1,
    },
    {
      width: 75,
    },
  ];
</script>

<svelte:head>
  <title>Admin - Gestion des Utilisateurs</title>
</svelte:head>

<div class="faux-body">
  <section>
    <header>
      <h2>Nos Utilisateurs</h2>
    </header>
    <div class="buttons-container">
      <Button type="danger" disabled={true}>Supprimer</Button>
      <Button type="secondary" disabled={true}>Editer</Button>
      <Button type="primary">Créer</Button>
    </div>
    <div class="grid-container">
      <Grid data={gridData} columns={gridColumns} />
    </div>
  </section>
</div>

<style lang="scss">
  .buttons-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 1rem;
  }

  .grid-container {
    width: 100%;
  }
</style>
