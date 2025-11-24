<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { Grid, type IApi } from "@svar-ui/svelte-grid";
  import type { PageData } from "./$types";
  import SelectionCheckboxCell from "$lib/components/grid/SelectionCheckboxCell.svelte";

  let { data }: { data: PageData } = $props();

  let gridData: any[] = data.profiles;
  let gridColumns: any[] = [
    {
      id: "select",
      cell: SelectionCheckboxCell,
      width: 36,
    },
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
  ];

  let api = $state<any>();
  let selectedRow = $state<string>();

  const updateSelected = () => {
    selectedRow = api.getState().selectedRows[0];
  };
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
      <Button type="danger" disabled={!selectedRow}>Supprimer</Button>
      <Button type="secondary" disabled={!selectedRow}>Editer</Button>
      <Button type="primary">Créer</Button>
    </div>
    <div class="grid-container">
      <Grid
        bind:this={api}
        data={gridData}
        columns={gridColumns}
        select={false}
        onselectrow={updateSelected}
      />
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
