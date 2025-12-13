class LoadingPanelState {
  isLoadingPanel = $state(false);

  start() {
    this.isLoadingPanel = true;
  }

  end() {
    this.isLoadingPanel = false;
  }
}

export const loadingPanel = new LoadingPanelState();
