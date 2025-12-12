<script lang="ts">
  import { getContext } from "svelte";
  const { showNotice, showModal } = getContext<any>("wx-helpers");
  import { notificationHelper } from "$lib/utils";
  import Navbar from "$lib/components/Navbar.svelte";
  notificationHelper.showNotice = showNotice;
  notificationHelper.showModal = showModal;

  let { children } = $props();
</script>

<Navbar />
{@render children()}
