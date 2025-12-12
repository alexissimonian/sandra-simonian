<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "@svar-ui/svelte-core";

  let { profile } = $props();
</script>

<aside>
  <nav>
    <ul>
      <li>
        <Button css="sideBarLink" icon="wxi-external" onclick={() => goto("/")}
          >Accueil</Button
        >
      </li>
      {#if profile.role === "admin"}
        <li>
          <Button
            css="sideBarLink"
            icon="wxi-external"
            onclick={() => goto("/admin")}>Admin</Button
          >
        </li>
      {/if}
    </ul>
  </nav>
</aside>

<style lang="scss">
  aside {
    height: 100%;
    border-right: 1px solid rgb(217, 217, 217);
    width: 260px;
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
  }

  li {
    margin-bottom: 0.5rem;
  }
</style>
