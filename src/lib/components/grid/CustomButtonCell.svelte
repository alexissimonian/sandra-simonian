<script>
  import { Button } from "@svar-ui/svelte-core";
  let { row, column, onaction } = $props();

  function onclick() {
    onaction &&
      onaction({
        action: "grid-button-clicked",
        data: {
          column: column.id,
          row: row.id,
        },
      });
  }
</script>

<div class="button-container">
  <Button type="link" {onclick} icon={"wxi-" + column.id} />
</div>

<style>
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
