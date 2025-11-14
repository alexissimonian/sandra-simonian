<script lang="ts">
  import { fly } from "svelte/transition";
  import type { Notification } from "$lib/types";
  import { removeNotification } from "$lib/stores/notifications";

  export let notification: Notification;

  function close() {
    removeNotification(notification.id);
  }

  // Icons for each type
  const icons = {
    success: {
      path: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
      color: "#4ade80",
    },
    error: {
      path: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#f87171",
    },
    warning: {
      path: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
      color: "#fbbf24",
    },
    info: {
      path: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
      color: "#60a5fa",
    },
  };

  $: icon = icons[notification.type];
</script>

<div
  class="notification notification--{notification.type}"
  in:fly={{ x: 8, y: 8, duration: 300 }}
  out:fly={{ x: 8, y: 8, duration: 200 }}
>
  <div class="notification__content">
    <div class="notification__body">
      <div class="notification__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path d={icon.path} stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <div class="notification__text">
        <p class="notification__title">{notification.type}</p>
        <p class="notification__message">{notification.message}</p>
      </div>
      <div class="notification__close">
        <button type="button" on:click={close} aria-label="Close">
          <span class="sr-only">Close</span>
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .notification {
    pointer-events: auto;
    width: 100%;
    max-width: 24rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    outline: 1px solid rgb(0 0 0 / 0.05);

    &__content {
      padding: 1rem;
    }

    &__body {
      display: flex;
      align-items: flex-start;
    }

    &__icon {
      flex-shrink: 0;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &--success &__icon {
      color: #4ade80;
    }

    &--error &__icon {
      color: #f87171;
    }

    &--warning &__icon {
      color: #fbbf24;
    }

    &--info &__icon {
      color: #60a5fa;
    }

    &__text {
      margin-left: 0.75rem;
      flex: 1;
      min-width: 0;
      padding-top: 0.125rem;
    }

    &__title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
    }

    &__message {
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    &__close {
      margin-left: 1rem;
      display: flex;
      flex-shrink: 0;

      button {
        display: inline-flex;
        border-radius: 0.375rem;
        background: transparent;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 0;

        &:hover {
          color: #6b7280;
        }

        &:focus {
          outline: 2px solid #4f46e5;
          outline-offset: 2px;
        }

        svg {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }
</style>
