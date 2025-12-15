<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    subtitle,
    children,
  }: { title: string; subtitle: string; children?: Snippet } = $props();
</script>

<div class="body-header">
  <div class="header-items">
    <header>
      <h1 class="page-title">{title}</h1>
    </header>
    <p class="page-sub-title">
      {subtitle}
    </p>
  </div>
  <div class="header-actions">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style lang="scss">
  .body-header {
    padding-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .page-title {
      padding-bottom: 0.5rem;
      font-size: $text-3xl;
    }

    .page-sub-title {
      color: $text-muted-color;
      font-size: $text-lg;
    }
  }
</style>
