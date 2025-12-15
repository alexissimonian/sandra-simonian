<script lang="ts">
  import { goto } from "$app/navigation";
  import { notify } from "$lib/utils";
  import { sendFormData, validateEmailField } from "$lib/utils/form";
  import { Text, Field, Button } from "@svar-ui/svelte-core";

  let currentStep = $state("email");
  let isEmailError = $state(false);
  let email = $state("");
  let code = $state("");
  let isCodeError = $state(false);
  let isEmailValidation = $state(false);
  let isCodeValidation = $state(false);

  function goBackToEmail() {
    currentStep = "email";
  }

  async function validateEmailForm() {
    isEmailValidation = true;
    isEmailError = !validateEmailField(email);
    if (!isEmailError) {
      const formData = new FormData();
      formData.append("email", email);
      const response = await sendFormData("?/login", formData);
      if (response.status === 200) {
        currentStep = "code";
        notify("success", "Email envoyé !");
      } else {
        isEmailError = true;
        const message = await response.json();
        notify("danger", message.error.message ?? "Un problème est survenu...");
      }
    } else {
      notify("danger", "Veuillez entrer un email valide.");
    }
    isEmailValidation = false;
  }

  function validateCodeField(): boolean {
    const regex = /\d{8}/;
    return regex.test(code);
  }

  async function validateCodeForm() {
    isCodeValidation = true;
    isCodeError = !validateCodeField();
    if (!isCodeError) {
      const formData = new FormData();
      formData.append("code", code);
      formData.append("email", email);
      const response = await sendFormData("?/code", formData);
      if (response.status === 200) {
        goto("/app?source=login");
      } else {
        isCodeError = true;
        const message = await response.json();
        notify("danger", message.error.message ?? "Un problème est survenu...");
      }
    } else {
      notify("danger", "Le code est composé de 8 chiffres.");
    }
    isCodeValidation = false;
  }
</script>

<div class="faux-body">
  <div class="form-container">
    <header>
      <h1>Connectez-vous</h1>
    </header>
    {#if currentStep === "email"}
      <div>
        <Field label="Email" error={isEmailError} required>
          {#snippet children(params?: any)}
            <Text
              bind:value={email}
              id={params.id}
              error={isEmailError}
              onchange={() => (isEmailError = false)}
              placeholder="votre@email.com"
              disabled={isEmailValidation}
            />
          {/snippet}
        </Field>
      </div>
      <Button
        type="primary block"
        disabled={isEmailValidation}
        onclick={() => validateEmailForm()}
        >{isEmailValidation ? "Chargement..." : "Me connecter"}</Button
      >
    {/if}

    {#if currentStep === "code"}
      <div>
        <Field label="Code" error={isCodeError} required>
          {#snippet children(params?: any)}
            <Text
              bind:value={code}
              id={params.id}
              error={isCodeError}
              onchange={() => (isCodeError = false)}
              placeholder="00000000"
              disabled={isCodeValidation}
            />
          {/snippet}
        </Field>
      </div>
      <div class="code-validation-buttons">
        <Button
          type="primary block"
          disabled={isCodeValidation}
          onclick={() => validateCodeForm()}
          >{isCodeValidation ? "Chargement..." : "Entrer"}</Button
        >
        <Button
          type="link"
          disabled={isCodeValidation}
          onclick={() => goBackToEmail()}>Changer l'email d'envoi</Button
        >
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  h1 {
    font-weight: 800;
    font-size: 2rem;
  }

  .form-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;
  }

  .faux-body {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .code-validation-buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
</style>
