<script lang="ts">
  import { getContext } from "svelte";
  const { showNotice, showModal } = getContext<any>("wx-helpers");
  import { notificationHelper } from "$lib/utils";
  import Navbar from "$lib/components/Navbar.svelte";
  import SideBar from "$lib/components/SideBar.svelte";
  import Footer from "$lib/components/Footer.svelte";

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
        {@render children()}
      </main>
      <Footer />
    </div>
  </div>
</div>
