<script lang="ts">
  import { getContext } from "svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import { browser } from "$app/environment";
  const { showNotice, showModal } = getContext<any>("wx-helpers");
  import { loadingPanel } from "$lib/types";
  import { notificationHelper } from "$lib/utils";
  import Navbar from "$lib/components/Navbar.svelte";
  import SideBar from "$lib/components/SideBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import LoadingPanel from "$lib/components/LoadingPanel.svelte";

  let { data, children } = $props();
  let profile = data.profile;

  notificationHelper.showNotice = showNotice;
  notificationHelper.showModal = showModal;

  beforeNavigate(() => {
    loadingPanel.start();
  });

  afterNavigate(() => {
    loadingPanel.end();
  });
</script>

<div class="app">
  <Navbar />
  <div class="app-content">
    <SideBar {profile} />
    <div class="main">
      <main>
        {#if browser && loadingPanel.isLoadingPanel}
          <LoadingPanel />
        {:else}
          {@render children()}
        {/if}
      </main>
      <Footer />
    </div>
  </div>
</div>
