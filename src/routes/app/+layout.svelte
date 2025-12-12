<script lang="ts">
  import { getContext } from "svelte";
  const { showNotice, showModal } = getContext<any>("wx-helpers");
  import { notificationHelper } from "$lib/utils";
  import Navbar from "$lib/components/Navbar.svelte";

  let { children } = $props();

  notificationHelper.showNotice = showNotice;
  notificationHelper.showModal = showModal;
</script>

<Navbar />
{@render children()}
