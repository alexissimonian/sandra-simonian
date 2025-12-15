<script lang="ts">
  import { onMount } from "svelte";
  import { getContext } from "svelte";
  import { notificationHelper } from "$lib/utils";

  onMount(() => {
    const { showNotice, showModal } = getContext<any>("wx-helpers");
    notificationHelper.showNotice = showNotice;
    notificationHelper.showModal = showModal;
  });
</script>
