<script lang="ts">
  import { notifications } from "$lib/stores/notifications";
  import NotificationItem from "./NotificationItem.svelte";
</script>

<div class="notification-container" aria-live="assertive">
  <div class="notification-wrapper">
    {#each $notifications as notification (notification.id)}
      <NotificationItem {notification} />
    {/each}
  </div>
</div>

<style lang="scss">
  .notification-container {
    pointer-events: none;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem 1rem;
    z-index: 9999;

    @media (min-width: 640px) {
      align-items: flex-start;
      padding: 1.5rem;
    }
  }

  .notification-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;

    @media (min-width: 640px) {
      align-items: flex-end;
    }
  }
</style>
