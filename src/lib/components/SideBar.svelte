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
            ><i class="fa-sharp fa-light fa-gear-complex icon"></i>Admin</Button
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
</aside>

<style lang="scss">
  aside {
    height: 100%;
    border-right: 1px solid $border-gray-color;
    width: 260px;
    flex-shrink: 0;
    left: 0;
    padding: 1rem;
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
    color: $text-muted-color;
  }
</style>
