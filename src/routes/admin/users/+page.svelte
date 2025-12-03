<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { Grid } from "@svar-ui/svelte-grid";
  import type { PageData } from "./$types";
  import SelectionCheckboxCell from "$lib/components/grid/SelectionCheckboxCell.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  let { data }: { data: PageData } = $props();

  let gridData: any[] = data.profiles;
  let gridColumns: any[] = [
    {
      id: "select",
      cell: SelectionCheckboxCell,
      width: 36,
      disable: { condition: "role", value: "admin" },
    },
    {
      id: "firstname",
      header: "Prénom",
      flexgrow: 1,
    },
    {
      id: "lastname",
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
      id: "role",
      hidden: true,
    },
  ];

  let api = $state<any>();
  let selectedRow = $state<string>();

  const updateSelected = () => {
    selectedRow = api.getState().selectedRows[0];
  };

  const gotoEditPage = () => {
    goto(`${page.url.pathname}/edit/${selectedRow}`);
  };

  const gotoCreatePage = () => {
    goto(`${page.url.pathname}/create`);
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
      <Button type="secondary" disabled={!selectedRow} onclick={gotoEditPage}
        >Editer</Button
      >
      <Button type="primary" onclick={gotoCreatePage}>Créer</Button>
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
  .faux-body {
    height: 100dvh;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 1rem;
    padding: 0 1rem;
  }

  .grid-container {
    width: 100%;
    padding: 1rem;
  }
</style>
