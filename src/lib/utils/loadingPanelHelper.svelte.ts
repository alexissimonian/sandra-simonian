export let isLoadingPanel = $state<boolean>(false);

export function startLoading() {
  isLoadingPanel = true;
}

export function endLoading() {
  isLoadingPanel = false;
}
