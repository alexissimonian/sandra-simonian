<script lang="ts">
  import { Checkbox } from "@svar-ui/svelte-core";

  let { row, api, column } = $props();
  let isDisabled = evaluateDisabled();

  function evaluateDisabled(): boolean {
    if (column.disable) {
      return row[column.disable.condition] === column.disable.value;
    }
    return false;
  }

  function onChange(ev: any) {
    const { value } = ev;

    // Si single-select, désélectionner les autres avant de sélectionner
    if (value && !(column.multiselect ?? false)) {
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
  <Checkbox disabled={isDisabled} onchange={onChange} />
</div>
