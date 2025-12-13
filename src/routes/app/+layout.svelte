<script lang="ts">
  import { getContext } from "svelte";
  const { showNotice, showModal } = getContext<any>("wx-helpers");
  import { notificationHelper } from "$lib/utils";
  import Navbar from "$lib/components/Navbar.svelte";
  import SideBar from "$lib/components/SideBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { isLoadingPanel } from "$lib/utils/loadingPanelHelper.svelte.js";
  import LoadingPanel from "$lib/components/LoadingPanel.svelte";

  let { data, children } = $props();
  let profile = data.profile;

  notificationHelper.showNotice = showNotice;
  notificationHelper.showModal = showModal;
</script>

<div class="app">
  <Navbar />
  <div class="app-content">
    <SideBar {profile} />
    <div class="main">
      <main>
        {#if isLoadingPanel}<LoadingPanel />{:else}
          {@render children()}
        {/if}
      </main>
      <Footer />
    </div>
  </div>
</div>
