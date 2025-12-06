<script lang="ts">
  import { getContext } from "svelte";
  const { showNotice, showModal } = getContext<any>("wx-helpers");
  import { notificationHelper } from "$lib/utils";
  notificationHelper.showNotice = showNotice;
  notificationHelper.showModal = showModal;

  let { children } = $props();
</script>

{@render children()}
