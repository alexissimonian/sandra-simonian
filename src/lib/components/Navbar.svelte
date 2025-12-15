<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "@svar-ui/svelte-core";
  import { DropDownMenu } from "@svar-ui/svelte-menu";

  let { isPublicRoute } = $props();

  let options = [{ id: "logout", text: "Déconnexion", icon: "wxi-external" }];

  function optionClicked(ev: any) {
    switch (ev.option.id) {
      case "logout":
        goto("/logout");
        break;

      default:
        break;
    }
  }
</script>

<header class="headerbar">
  {#if isPublicRoute}
    <Button css="navbutton">
      <i class="fa-sharp fa-light fa-bell-concierge icon"></i> Aide</Button
    >
  {:else}
    <DropDownMenu {options} onclick={optionClicked}>
      <Button css="navbutton" icon="wxi-account">Compte</Button>
    </DropDownMenu>
  {/if}
</header>

<style lang="scss">
  header {
    display: flex;
    gap: 1rem;
    width: 100%;
    border-bottom: 1px solid $border-gray-color;
    padding: 0.75rem 1rem;
    align-items: flex-end;
    flex-direction: column;
  }

  .headerbar :global(button.navbutton) {
    background-color: white;
  }
</style>
