function configuration() {
    this.active = null;
    this.storageProvider = {
      local: "local",
      session: "session",
      network: "network",
    }
    set: this.setService = (para) => {
      this.active = this.storageProvider[para];
    };
    get: this.getService = () => {
      return this.active;
    }
}

export default configuration;
