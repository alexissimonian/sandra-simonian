<script lang="ts">
  import { Checkbox } from "@svar-ui/svelte-core";

  let { row, api, multiselect = false } = $props();

  function onChange(ev: any) {
    const { value } = ev;

    // Si single-select, désélectionner les autres avant de sélectionner
    if (value && !multiselect) {
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
