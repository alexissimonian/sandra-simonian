<script lang="ts">
  import { Checkbox } from "@svar-ui/svelte-core";

  let { row, api } = $props();

  function onChange(ev: any) {
    const { value } = ev;

    if (value) {
      api.exec("unselect-all");
    }

    api.exec("select-row", {
      id: row.id,
      mode: value,
      toggle: true,
    });
  }
</script>

<div data-action="ignore-click">
  <Checkbox onchange={onChange} />
</div>
