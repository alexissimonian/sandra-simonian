<script lang="ts">
  import { Button } from "@svar-ui/svelte-core";
  import { Grid } from "@svar-ui/svelte-grid";
  import type { PageData } from "./$types";
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { notify, sendFormData, verify } from "$lib/utils";
  import type { Profile } from "$lib/types";
  import CustomButtonCell from "$lib/components/grid/CustomButtonCell.svelte";

  let { data }: { data: PageData } = $props();

  let isDeletion = $state(false);
  let hasEngagingInteraction = $derived(isDeletion);

  let gridData: Profile[] = $derived(data.profiles);
  let gridColumns: any[] = [
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
      template: (v: string) =>
        v ? new Date(v).toLocaleDateString("fr") : "Jamais connecté.",
    },
    {
      id: "validFrom",
      header: "Valide à Partir de",
      flexgrow: 1,
      template: (v: string) =>
        v ? new Date(v).toLocaleDateString("fr") : "Non spécifié.",
    },
    {
      id: "validTo",
      header: "Valide Jusqu'au",
      flexgrow: 1,
      template: (v: string) =>
        v ? new Date(v).toLocaleDateString("fr") : "Non spécifié.",
    },
    {
      id: "edit",
      cell: CustomButtonCell,
      width: 50,
    },
    {
      id: "delete",
      cell: CustomButtonCell,
      width: 50,
    },
  ];

  const gotoEditPage = (id: string) => {
    goto(`${page.url.pathname}/editorcreate?id=${id}`);
  };

  const gotoCreatePage = () => {
    goto(`${page.url.pathname}/editorcreate`);
  };

  async function deleteSelectedUser(id: string) {
    try {
      const selectedProfile = gridData.find((gd) => gd.id === id);
      if (!selectedProfile) return;
      isDeletion = true;
      const isConfirmed = await verify(
        `Es-tu sûre de vouloir supprimer ${selectedProfile.firstname} ${selectedProfile.lastname} ?`,
        "Ses données seront supprimées définitivement.",
      );
      if (!isConfirmed) return;
      const formData = new FormData();
      formData.append("userId", selectedProfile.id);
      const response = await sendFormData("?/deleteUser", formData);
      if (response.status === 200) {
        await invalidateAll();
        notify("success", "Utilisateur supprimé !");
      } else {
        const message = await response.json();
        notify("danger", message.error.message ?? "Un problème est survenu...");
      }
    } finally {
      isDeletion = false;
    }
  }

  function handleGridButtonClicked(ev: any) {
    if (ev.column === "edit") {
      gotoEditPage(ev.row);
    } else if (ev.column === "delete") {
      deleteSelectedUser(ev.row);
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
        type="primary"
        onclick={gotoCreatePage}
        disabled={hasEngagingInteraction}
        icon="wxi-plus"
      />
    </div>
    <div class="grid-container">
      <Grid
        data={gridData}
        columns={gridColumns}
        multiselect={false}
        footer={false}
        ongridbuttonclicked={(ev) => handleGridButtonClicked(ev)}
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
    padding: 0rem 1rem;

    :global(.wx-grid) {
      height: auto;
    }
  }
</style>
