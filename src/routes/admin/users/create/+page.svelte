<script lang="ts">
  import {
    Field,
    Text,
    Button,
    DatePicker,
    MultiCombo,
  } from "@svar-ui/svelte-core";
  import {
    notify,
    sendFormData,
    validateEmailField,
    validateNameField,
    getComparableTodayDate,
    validateDateRange,
  } from "$lib/utils";
  import { goto } from "$app/navigation";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import type { PageData } from "./$types";
  import type { Activity, Module } from "$lib/types";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();

  // TODO: faire des customs field avec erreur intégrées pour la validation des input
  // TODO: modifier les notifs
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
  let activityToModules = new Map<string, Set<string>>();
  let moduleToActivities = new Map<string, Set<string>>();

  //on mount : build lookup activity to module and module to activity
  onMount(() => {
    buildActivitiesAndModulesLookups();
  });

  let activities = data.activities.map((da) => {
    return { id: da.id, label: da.name };
  });

  let selectedActivities = $state<string[]>([]);

  let modules = data.modules.map((dm) => {
    return { id: dm.id, label: dm.name };
  });

  let selectedModules = $state<string[]>([]);

  function onActivitySelected(): void {
    const currentlySelectedModules = new Set(selectedModules);
    const newlySelectedModules = new Set<string>();
    moduleToActivities.forEach((v: Set<string>, k: string) => {
      if (v.isSupersetOf(new Set(selectedActivities))) {
        newlySelectedModules.add(k);
      }
    });
    const selectedModulesSet =
      currentlySelectedModules.union(newlySelectedModules);
    selectedModules = [...selectedModulesSet];
  }

  function onModuleSelected(): void {}

  // form validation
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
      const response = await sendFormData("?/create", formData);
      if (response.status === 200) {
        notify("success", `Utilisateur créé !`);
        goto("/admin/users");
      } else {
        const message = await response.json();
        notify("danger", message.error.message ?? "Un problème est survenu...");
      }
    }

    isCreating = false;
  }

  function buildActivitiesAndModulesLookups() {
    for (const mod of data.modules) {
      moduleToActivities.set(
        mod.id,
        new Set(mod.activities.map((a: Activity) => a.id)),
      );

      for (const activity of mod.activities) {
        if (!activityToModules.has(activity.id)) {
          activityToModules.set(activity.id, new Set());
        }
        activityToModules.get(activity.id)!.add(mod.id);
      }
    }
  }
</script>

<svelte:head>
  <title>Admin - Créer un utilisateur</title>
</svelte:head>

<div class="faux-body">
  <PageHeader
    title="Créer un utilisateur"
    subtitle="Créer les informations d'un utilisateur et lui donner accès à certains
      cours."
  >
    <Button css="header-button validate" type="primary" onclick={validateForm}
      >Créer</Button
    >
  </PageHeader>
  <div class="body-content">
    <section class="account-details">
      <header>
        <h2>Détails du compte</h2>
      </header>
      <div>
        <div>
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
        </div>
      </div>
    </section>
    <section class="account-courses">
      <div class="modules-container">
        <header>
          <h2>Modules</h2>
        </header>
        <MultiCombo
          checkboxes={true}
          options={modules}
          bind:value={selectedModules}
        />
      </div>
      <div class="courses-container">
        <header>
          <h2>Cours</h2>
        </header>
        <MultiCombo
          checkboxes={true}
          options={activities}
          bind:value={selectedActivities}
          onchange={onActivitySelected}
        />
      </div>
    </section>
  </div>
</div>

<style lang="scss">
  section {
    display: flex;
    align-items: flex-start;
  }

  .faux-body {
    display: flex;
    flex-direction: column;
  }

  .body-content {
    display: flex;
    gap: 10rem;

    .account-courses {
      display: flex;
      gap: 2rem;
      flex: 1;
    }
    .account-details {
      flex: 0;
    }

    .courses-container,
    .modules-container {
      width: 100%;
    }
  }
</style>
