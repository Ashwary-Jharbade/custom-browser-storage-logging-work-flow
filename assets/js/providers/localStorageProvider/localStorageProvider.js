const isLocalKeyExists = (key) => {
  if (localStorage.getItem(key)) return true;
  return false;
};

const logLocalStorage = (key, obj) => {
  if (isLocalKeyExists(key)) {
    let localData = localStorage.getItem(key);
    localData = JSON.parse(localData);
    localData.push(obj);
    localStorage.setItem(key, JSON.stringify(localData));
  } else {
    localStorage.setItem(key, JSON.stringify([obj]));
  }
};

const localStorageProvider = (obj) => {
  obj.accesskey = new Date().getTime();
  return new Proxy(obj, {
    set: (target, key, value) => {
      let message = `Added new property named ${key}`;
      if (target.hasOwnProperty(key)) {
        message = `Updated property named ${key}`;
      }
      target[key] = value;
      const logObj = {
        status: true,
        timeStamp: new Date(),
        action: message,
        target,
        key,
        value,
      };
      logLocalStorage(target.accesskey, logObj);
      return logObj.status;
    },
    get: (target, key) => {
      let message = `Called ${key} attribute of object`;
      let status = false;
      if (target.hasOwnProperty(key)) {
        status = true;
      }
      const logObj = {
        timeStamp: new Date(),
        action: message,
        target,
        key,
        status,
      };
      logLocalStorage(target.accesskey, logObj);
      return target[key];
    },
    deleteProperty: (target, key) => {
      let message = `Deleting ${key} attribute of object`;
      let status = false;
      if (target.hasOwnProperty(key)) {
        status = true;
      }
      const logObj = {
        timeStamp: new Date(),
        action: message,
        target,
        key,
        status,
      };
      logLocalStorage(target.accesskey, logObj);
      return delete target[key];
    },
  });
};

export default localStorageProvider;
