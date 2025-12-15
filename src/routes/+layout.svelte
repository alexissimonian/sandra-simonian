<script lang="ts">
  import { Globals, Willow as WillowCore } from "@svar-ui/svelte-core";
  import { Willow as WillowGrid } from "@svar-ui/svelte-grid";
  import "../app.scss";
  import Navbar from "$lib/components/Navbar.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { loadingPanel } from "$lib/types";
  import Footer from "$lib/components/Footer.svelte";
  import SideBar from "$lib/components/SideBar.svelte";
  import LoadingPanel from "$lib/components/LoadingPanel.svelte";
  import Notifications from "$lib/components/Notifications.svelte";
  import { browser } from "$app/environment";

  let { data, children } = $props();
  let profile = $derived(data.profile);

  beforeNavigate(() => {
    loadingPanel.start();
  });

  afterNavigate(() => {
    loadingPanel.end();
  });
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</svelte:head>

<WillowCore>
  <WillowGrid>
    <div class="app">
      <Navbar isPublicRoute={data.isPublicRoute} />
      <div class="app-content">
        {#if !data.isPublicRoute}
          <SideBar {profile} />
        {/if}
        <div class="main-container">
          <main>
            <Globals>
              <Notifications />
              {#if browser && loadingPanel.isLoadingPanel}
                <LoadingPanel />
              {:else}
                {@render children()}
              {/if}
            </Globals>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  </WillowGrid>
</WillowCore>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .app-content {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .main-container {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    main {
      flex: 1;
      padding: 3rem 7rem;
    }
  }
</style>
