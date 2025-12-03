<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import { sendFormData, validateEmailField } from "$lib/utils/form";
  import { Text, Field } from "@svar-ui/svelte-core";
  import { text } from "@sveltejs/kit";
  import { getContext } from "svelte";
  const { showNotice } = getContext<any>("wx-helpers");

  let currentStep = $state("email");
  let isEmailError = $state(false);
  let email = $state("");
  let code = $state("");
  let isCodeError = $state(false);

  function goBackToEmail() {
    currentStep = "email";
  }

  async function validateEmailForm() {
    isEmailError = !validateEmailField(email);
    if (!isEmailError) {
      const formData = new FormData();
      formData.append("email", email);
      const response = await sendFormData("?/login", formData);
      if (response.status === 200) {
        currentStep = "code";
        showNotice({
          type: "success",
          expire: 6000,
          text: "Email envoyé !",
        });
      } else {
        isEmailError = true;
        const message = await response.json();
        showNotice({
          type: "danger",
          expire: 6000,
          text: message.error.message ?? "Un problème est survenu.",
        });
      }
    } else {
      showNotice({
        type: "danger",
        expire: 6000,
        text: "Veuillez entrer un email valide.",
      });
    }
  }

  function validateCodeField(): boolean {
    const regex = /\d{8}/;
    return regex.test(code);
  }

  async function validateCodeForm() {
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
        showNotice({
          type: "danger",
          expire: 6000,
          text: message.error.message ?? "Un problème est survenu.",
        });
      }
    } else {
      showNotice({
        type: "danger",
        expire: 6000,
        text: "Le code est composé de 8 chiffres.",
      });
    }
  }
</script>

<div class="faux-body">
  <h2>Bienvenue</h2>
  {#if currentStep === "email"}
    <form>
      <Field label="Email" error={isEmailError} required>
        {#snippet children({ id })}
          <Text
            bind:value={email}
            {id}
            error={isEmailError}
            onchange={() => (isEmailError = false)}
            placeholder="votre@email.com"
          />
        {/snippet}
      </Field>
    </form>
    <Button type="primary" onclick={() => validateEmailForm()}
      >Me connecter</Button
    >
  {/if}

  {#if currentStep === "code"}
    <form>
      <Field label="Code" error={isCodeError} required>
        {#snippet children({ id })}
          <Text
            bind:value={code}
            {id}
            error={isCodeError}
            onchange={() => (isCodeError = false)}
            placeholder="00000000"
          />
        {/snippet}
      </Field>
    </form>
    <div class="code-validation-buttons">
      <Button type="primary" onclick={() => validateCodeForm()}>Entrer</Button>
      <Button type="link" onclick={() => goBackToEmail()}
        >Changer l'email d'envoi</Button
      >
    </div>
  {/if}
</div>

<style lang="scss">
  .faux-body {
    height: 100dvh;
  }

  .code-validation-buttons {
    display: flex;
    gap: 2rem;
  }

  h2 {
    font-size: 4rem;
    margin: 2em;
  }
</style>
