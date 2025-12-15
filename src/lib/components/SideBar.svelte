<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "@svar-ui/svelte-core";

  let { profile } = $props();
</script>

<aside>
  <nav>
    <ul>
      <li class="separator">App</li>
      <li>
        <Button css="sideBarLink" onclick={() => goto("/app")}
          ><i class="fa-sharp fa-light fa-house icon"></i>Accueil</Button
        >
      </li>
      {#if profile?.role === "admin"}
        <li class="separator">Admin</li>
        <li>
          <Button css="sideBarLink" onclick={() => goto("/admin")}
            ><i class="fa-sharp fa-light fa-gear icon"></i>Admin</Button
          >
        </li>
        <li>
          <Button css="sideBarLink" onclick={() => goto("/admin/users")}>
            <i class="fa-sharp fa-light fa-user-gear icon"></i> Utilisateurs</Button
          >
        </li>
      {/if}
    </ul>
  </nav>
  <div class="sidebar-bottom-container">
    <div class="sidebar-button-container">
      <Button css="sidebarbutton"
        ><i class="fa-sharp fa-light fa-sidebar"></i></Button
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
    width: 260px;
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

  ul :global(button.sideBarLink) {
    background-color: white;
    width: 100%;
    text-align: left;
    color: $text-muted-color;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .separator {
    font-weight: bold;
    color: rgb(217, 217, 217);
    padding: 0.3rem 1.3rem;
  }

  .icon {
    color: $text-light-gray;
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
  }
</style>
