<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

{#if !form?.step || form?.step === "email"}
  <form id="login-form" action="?/login" method="post" use:enhance>
    <input
      type="email"
      name="email"
      placeholder="exemple@exemple.com"
      required
    />
  </form>
  <button form="login-form" type="submit">Entrer</button>
{/if}

{#if form?.step === "code"}
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
  <button form="code-form" type="submit">Entrer</button>
  <a href="/login">Changer l'email d'envoi</a>
{/if}

<style lang="scss"></style>
