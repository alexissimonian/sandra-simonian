<script>
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";

  export let form;

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
  <form id="login-form" action="?/login" method="post" use:enhance>
    <input
      type="email"
      name="email"
      placeholder="exemple@exemple.com"
      required
    />
  </form>
  <Button form="login-form" type="submit">Entrer</Button>
{/if}

{#if currentStep === "code"}
  <form id="code-form" action="?/code" method="post" use:enhance>
    <input type="hidden" name="email" value={form?.email} />
    <input
      type="text"
      name="code"
      placeholder="000-000"
      value={form?.code || ""}
      required
    />
  </form>
  <Button form="code-form" type="submit">Entrer</Button>
  <button type="button" on:click={goBackToEmail}>Changer l'email d'envoi</button
  >
{/if}

<style lang="scss"></style>
