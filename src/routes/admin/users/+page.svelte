<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { Grid } from "@svar-ui/svelte-grid";
  import type { PageData } from "./$types";
  import SelectionCheckboxCell from "$lib/components/grid/SelectionCheckboxCell.svelte";
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { notify, sendFormData, verify } from "$lib/utils";
  import type { Profile } from "$lib/types";

  let { data }: { data: PageData } = $props();

  let isDeletion = $state(false);
  let hasEngagingInteraction = $derived(isDeletion);

  let gridData: Profile[] = $derived(data.profiles);
  let gridColumns: any[] = [
    {
      id: "select",
      cell: SelectionCheckboxCell,
      width: 36,
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
  let selectedRow = $state<string>("");

  const updateSelected = () => {
    selectedRow = api.getState().selectedRows[0];
  };

  const gotoEditPage = () => {
    goto(`${page.url.pathname}/edit/${selectedRow}`);
  };

  const gotoCreatePage = () => {
    goto(`${page.url.pathname}/create`);
  };

  async function deleteSelectedUser() {
    try {
      const selectedProfile = gridData.find((gd) => gd.id === selectedRow);
      if (!selectedProfile) return;
      isDeletion = true;
      await verify(
        `Es-tu sûre de vouloir supprimer ${selectedProfile.firstname} ${selectedProfile.lastname} ?`,
        "Ses données seront supprimées définitivement.",
      );
      const selectedUserId = selectedRow;
      const formData = new FormData();
      formData.append("userId", selectedUserId);
      const response = await sendFormData("?/deleteUser", formData);
      if (response.status === 200) {
        await invalidateAll();
        selectedRow = "";
        notify("success", "Utilisateur supprimé !");
      } else {
        const message = await response.json();
        notify("danger", message.error.message ?? "Un problème est survenu...");
      }
    } finally {
      isDeletion = false;
    }
  }
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
      <Button
        type="danger"
        disabled={!selectedRow || hasEngagingInteraction}
        onclick={deleteSelectedUser}
        >{isDeletion ? "Chargement..." : "Supprimer"}</Button
      >
      <Button
        type="secondary"
        disabled={!selectedRow || hasEngagingInteraction}
        onclick={gotoEditPage}>Editer</Button
      >
      <Button
        type="primary"
        onclick={gotoCreatePage}
        disabled={hasEngagingInteraction}>Créer</Button
      >
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
