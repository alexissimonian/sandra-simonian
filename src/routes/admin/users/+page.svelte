<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { Grid } from "@svar-ui/svelte-grid";
  import type { PageData } from "../$types";

  export let data: PageData;
  let gridData: any[] = [
    {
      id: 1,
      city: "Amieshire",
      email: "Leora13@yahoo.com",
      firstName: "Ernest",
      lastName: "Schuppe",
      companyName: "Lebsack - Nicolas",
    },
    {
      id: 2,
      city: "Gust",
      email: "Mose_Gerhold51@yahoo.com",
      firstName: "Janis",
      lastName: "Vandervort",
      companyName: "Glover - Hermiston",
    },
  ];
  let gridColumns: any[] = [
    {
      id: "firstName",
      header: "Prénom",
      flexgrow: 1,
    },
    {
      id: "lastName",
      header: "Nom",
      flexgrow: 1,
    },
    {
      id: "email",
      header: "Email",
      flexgrow: 1,
    },
    {
      id: "email_verified",
      header: "Vérifié",
      width: 75,
    },
    {
      id: "last_logged_in",
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
