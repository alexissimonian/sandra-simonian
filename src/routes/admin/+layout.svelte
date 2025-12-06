<script lang="ts">
  import { getContext } from "svelte";
  const { showNotice } = getContext<any>("wx-helpers");
  import { notificationHelper } from "$lib/utils";
  notificationHelper.showNotice = showNotice;

  let { children } = $props();
</script>

{@render children()}
