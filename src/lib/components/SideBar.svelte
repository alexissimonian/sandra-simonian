<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "@svar-ui/svelte-core";
  import { page } from "$app/state";

  let pageRoute = $derived(page.url.pathname);
  let { profile } = $props();
</script>

<aside>
  <nav>
    <ul>
      <li class="separator">App</li>
      <li>
        <Button
          type={pageRoute === "/app" ? "primary" : undefined}
          css={pageRoute === "/app"
            ? "sidebarbutton active"
            : "sidebarbutton nonactive"}
          onclick={() => goto("/app")}>Accueil</Button
        >
      </li>
      {#if profile?.role === "admin"}
        <li class="separator">Admin</li>
        <li>
          <Button
            type={pageRoute === "/admin" ? "primary" : undefined}
            css={pageRoute === "/admin"
              ? "sidebarbutton active"
              : "sidebarbutton nonactive"}
            onclick={() => goto("/admin")}>Admin</Button
          >
        </li>
        <li>
          <Button
            type={pageRoute === "/admin/users" ? "primary" : undefined}
            css={pageRoute === "/admin/users"
              ? "sidebarbutton active"
              : "sidebarbutton nonactive"}
            onclick={() => goto("/admin/users")}
          >
            Utilisateurs</Button
          >
        </li>
      {/if}
    </ul>
  </nav>
  <div class="sidebar-bottom-container">
    <div class="sidebar-button-container">
      <Button css="sidebarbutton"
        ><i
          class="fa-whiteboard fa-semibold fa-arrow-right-to-bracket fa-rotate-180"
        ></i></Button
      >
    </div>
  </div>
</aside>

<style lang="scss">
  aside {
    display: flex;
    flex-direction: column;
    min-height: 0;
    border-right: 1px solid $border-gray-color;
    width: 250px;
    flex-shrink: 0;
    position: relative;

    nav {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul :global(button.sidebarbutton) {
    width: 100%;
    text-align: left;
  }

  ul :global(button.nonactive) {
    background-color: white;
    color: $text-muted-color;
  }

  ul :global(button.active) {
    color: white;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .separator {
    font-weight: bold;
    color: rgb(217, 217, 217);
    padding: 0.3rem 0.75rem;
  }

  .sidebar-bottom-container {
    height: 48px;
    width: 100%;
    border-top: 1px solid $border-gray-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .sidebar-button-container :global(button.sidebarbutton) {
    font-size: 20px;
    background-color: white;
    margin-left: 1rem;
    padding: 0.25rem;
    border: 1px solid $border-gray-color;
    font-weight: 300;
  }
</style>
