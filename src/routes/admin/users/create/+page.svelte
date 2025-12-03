<script lang="ts">
  import { Field, Text, Button } from "@svar-ui/svelte-core";
  import {
    sendFormData,
    validateEmailField,
    validateNameField,
  } from "$lib/utils";

  let lastname = $state("");
  let isLastnameError = $state(false);
  let firstname = $state("");
  let isFirstnameError = $state(false);
  let email = $state("");
  let isEmailError = $state(false);

  async function validateForm() {
    isLastnameError = !validateNameField(lastname);
    isFirstnameError = !validateNameField(firstname);
    isEmailError = !validateEmailField(email);
    if (!isLastnameError && !isFirstnameError && !isEmailError) {
      const formData = new FormData();
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("email", email);
      await sendFormData("?/create", formData);
    }
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
          {#snippet children({ id })}
            <Text
              bind:value={lastname}
              {id}
              error={isLastnameError}
              onchange={() => (isLastnameError = false)}
            />
          {/snippet}
        </Field>
        <Field label="Prénom" error={isFirstnameError} required>
          {#snippet children({ id })}
            <Text
              bind:value={firstname}
              {id}
              error={isFirstnameError}
              onchange={() => (isFirstnameError = false)}
            />
          {/snippet}
        </Field>
        <Field label="Email" error={isEmailError} required>
          {#snippet children({ id })}
            <Text
              bind:value={email}
              {id}
              error={isEmailError}
              onchange={() => (isEmailError = false)}
            />
          {/snippet}
        </Field>
      </form>
      <div>
        {#if isLastnameError}
          <p class="error-message">
            Un nom de famille doit avoir au moins deux caractères.
          </p>
        {:else if isFirstnameError}
          <p class="error-message">
            Un prénom doit avoir au moins deux caractères.
          </p>
        {:else if isEmailError}
          <p class="error-message">Cet email n'est pas valide.</p>
        {/if}
      </div>
      <Button type="primary" onclick={() => validateForm()}>Créer</Button>
    </div>
  </section>
</div>

<style lang="scss">
</style>
