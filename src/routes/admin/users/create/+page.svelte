<script lang="ts">
  import { Field, Text, Button } from "@svar-ui/svelte-core";
  import {
    notify,
    sendFormData,
    validateEmailField,
    validateNameField,
  } from "$lib/utils";
  import { goto } from "$app/navigation";

  let lastname = $state("");
  let isLastnameError = $state(false);
  let firstname = $state("");
  let isFirstnameError = $state(false);
  let email = $state("");
  let isEmailError = $state(false);
  let isCreating = $state(false);

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
    if (!isLastnameError && !isFirstnameError && !isEmailError) {
      const formData = new FormData();
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      const response = await sendFormData("?/create", formData);
      if (response.status === 200) {
        notify("success", "utilisateur créé !");
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
</script>

<svelte:head>
  <title>Admin - Créer un utilisateur</title>
</svelte:head>

<div class="faux-body">
  <section>
    <header>
      <h2>Créer un utilisateur</h2>
    </header>
    <div>
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
      </form>
      <Button type="primary" onclick={validateForm} disabled={isCreating}
        >{isCreating ? "Chargement..." : "Créer"}</Button
      >
    </div>
  </section>
</div>

<style lang="scss">
</style>
