class LoadingPanelState {
  isLoadingPanel = $state(false);

  start() {
    setTimeout(() => {
      this.isLoadingPanel = true;
    }, 0);
  }

  end() {
    setTimeout(() => {
      this.isLoadingPanel = false;
    }, 0);
  }
}

export const loadingPanel = new LoadingPanelState();
