<script lang="ts">
  import { Field, Text, Button, DatePicker, Tabs } from "@svar-ui/svelte-core";
  import {
    notify,
    sendFormData,
    validateEmailField,
    validateNameField,
    getComparableTodayDate,
    validateDateRange,
    capitalize,
  } from "$lib/utils";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { Grid } from "@svar-ui/svelte-grid";

  let { data }: { data: PageData } = $props();

  let pageMode = data.mode;

  let lastname = $state("");
  let isLastnameError = $state(false);
  let firstname = $state("");
  let isFirstnameError = $state(false);
  let email = $state("");
  let isEmailError = $state(false);
  let isCreating = $state(false);
  let validFromDate: Date | undefined = $state(getComparableTodayDate());
  let validToDate: Date | undefined = $state(undefined);
  let isValidFromDateError = $state(false);
  let isValidToDateError = $state(false);
  let activeTab = $state(0);
  let api = $state<any>();

  onMount(() => {
    if (pageMode === "edit") {
      if (!data.user) {
        notify("danger", "Le profil n'est pas chargé dans cette page !");
        goto("/admin/users");
      } else {
        firstname = capitalize(data.user.firstname);
        lastname = capitalize(data.user.lastname);
        email = data.user.email;
        validFromDate = data.user.validFrom
          ? new Date(data.user.validFrom)
          : undefined;
        validToDate = data.user.validTo
          ? new Date(data.user.validTo)
          : undefined;
      }
    }
  });

  async function validateForm() {
    isCreating = true;
    if ((isLastnameError = !validateNameField(lastname)))
      notify(
        "warning",
        "Un nom de famille doit avoir au moins deux caractères !",
      );
    if ((isFirstnameError = !validateNameField(firstname)))
      notify("warning", "Un prénom doit avoir au moins deux caractères !");
    if ((isEmailError = !validateEmailField(email)))
      notify("warning", "Il faut entrer un email valide.");
    if (
      data.mode === "create" &&
      validFromDate &&
      (isValidFromDateError = !validateDateRange(
        validFromDate,
        getComparableTodayDate(),
      ))
    )
      notify(
        "warning",
        "La date de début de validité ne peut pas être antérieure à aujourd'hui.",
      );
    if (
      validToDate &&
      (isValidToDateError = !validateDateRange(
        validToDate,
        validFromDate ?? getComparableTodayDate(),
      ))
    )
      notify(
        "warning",
        "La date de fin de validité ne peut pas être antérieure à la date de début de validité ou aujourd'hui.",
      );
    if (
      !isLastnameError &&
      !isFirstnameError &&
      !isEmailError &&
      !isValidFromDateError &&
      !isValidToDateError
    ) {
      const formData = new FormData();
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      if (validFromDate)
        formData.append("validFromDate", validFromDate.toDateString());
      if (validToDate)
        formData.append("validToDate", validToDate.toDateString());
      if (data.user) formData.append("userId", data.user.id);
      const response = await sendFormData(`?/${pageMode}`, formData);
      if (response.status === 200) {
        notify(
          "success",
          `Utilisateur ${pageMode === "edit" ? "modifié" : "créé"} !`,
        );
        lastname = "";
        firstname = "";
        email = "";
        goto("/admin/users");
      } else {
        const message = await response.json();
        notify("danger", message.error.message ?? "Un problème est survenu...");
      }
    }
    isCreating = false;
  }

  const tabs = [
    { id: 0, label: "Compte", icon: "fa-thin fa-user" },
    { id: 1, label: "Cours", icon: "fa-thin fa-book" },
  ];
</script>

<svelte:head>
  <title
    >Admin - {pageMode === "edit" ? "Modifier" : "Créer"} un utilisateur</title
  >
</svelte:head>

<div class="faux-body">
  <section>
    <header>
      <h2>{pageMode === "edit" ? "Modifier" : "Créer"} un utilisateur</h2>
    </header>
    <div>
      <div class="tabs-container">
        <Tabs options={tabs} bind:value={activeTab} />
      </div>
      {#if activeTab === 0}
        <form>
          <Field label="Nom" error={isLastnameError} required>
            {#snippet children(params?: any)}
              <Text
                bind:value={lastname}
                id={params.id}
                error={isLastnameError}
                onchange={() => (isLastnameError = false)}
                disabled={isCreating}
              />
            {/snippet}
          </Field>
          <Field label="Prénom" error={isFirstnameError} required>
            {#snippet children(params?: any)}
              <Text
                bind:value={firstname}
                id={params.id}
                error={isFirstnameError}
                onchange={() => (isFirstnameError = false)}
                disabled={isCreating}
              />
            {/snippet}
          </Field>
          <Field label="Email" error={isEmailError} required>
            {#snippet children(params?: any)}
              <Text
                bind:value={email}
                id={params.id}
                error={isEmailError}
                onchange={() => (isEmailError = false)}
                disabled={isCreating}
              />
            {/snippet}
          </Field>
          <Field label="Valide à partir">
            {#snippet children(params?: any)}
              <DatePicker
                id={params.id}
                bind:value={validFromDate}
                format={"%d/%m/%Y"}
                onchange={() => {
                  isValidFromDateError = false;
                  isValidToDateError = false;
                }}
                disabled={isCreating}
                error={isValidFromDateError}
                clear
              />
            {/snippet}
          </Field>
          <Field label="Valide jusqu'au">
            {#snippet children(params?: any)}
              <DatePicker
                id={params.id}
                bind:value={validToDate}
                format={"%d/%m/%Y"}
                onchange={() => {
                  isValidFromDateError = false;
                  isValidToDateError = false;
                }}
                disabled={isCreating}
                error={isValidToDateError}
                clear
              />
            {/snippet}
          </Field>
        </form>
        <Button type="primary" onclick={validateForm} disabled={isCreating}
          >{isCreating
            ? "Chargement..."
            : pageMode === "edit"
              ? "Modifier"
              : "Créer"}</Button
        >
        <Button
          type="secondary"
          onclick={() => goto("/admin/users")}
          disabled={isCreating}>Annuler</Button
        >
      {:else}
        <div>
          <Grid bind:this={api} tree={true} />
        </div>
      {/if}
    </div>
  </section>
</div>

<style lang="scss">
  .tabs-container {
    margin-bottom: 2rem;
  }

  form {
    margin-bottom: 1.5rem;
  }
</style>
