<script lang="ts">
  let { title, subtitle, children } = $props();
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
    {@render children()}
  </div>
</div>
