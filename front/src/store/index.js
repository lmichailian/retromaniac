const Store = {
  user: {},
};

const proxiedStore = new Proxy(Store, {
  set: (target, key, value) => {
    target[key] = value;

    if (key === "user") {
      window.dispatchEvent(new CustomEvent("newUser", { detail: target[key] }));
    }

    return true;
  },
});

export default proxiedStore;
