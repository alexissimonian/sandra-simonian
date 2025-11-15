<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";

  export let form;
  let emailForm: HTMLFormElement;
  let codeForm: HTMLFormElement;

  let currentStep = form?.step || "email";

  $: if (form?.step) {
    currentStep = form.step;
  }

  function goBackToEmail() {
    currentStep = "email";
  }
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

{#if currentStep === "email"}
  <form
    id="login-form"
    action="?/login"
    method="post"
    bind:this={emailForm}
    use:enhance
  >
    <input
      type="email"
      name="email"
      placeholder="exemple@exemple.com"
      required
    />
  </form>
  <Button type="primary" onclick={() => emailForm.requestSubmit()}
    >Entrer</Button
  >
{/if}

{#if currentStep === "code"}
  <form
    id="code-form"
    action="?/code"
    method="post"
    bind:this={codeForm}
    use:enhance
  >
    <input type="hidden" name="email" value={form?.email} />
    <input
      type="text"
      name="code"
      placeholder="000-000"
      value={form?.code || ""}
      required
    />
  </form>
  <Button type="primary" onclick={() => codeForm.requestSubmit()}>Entrer</Button
  >
  <Button type="link" onclick={goBackToEmail}>Changer l'email d'envoi</Button>
{/if}

<style lang="scss"></style>
