const isSessionKeyExists = (key) => {
  if (sessionStorage.getItem(key)) return true;
  return false;
};

const logSessionStorage = (key, obj) => {
  if (isSessionKeyExists(key)) {
    let sessionData = sessionStorage.getItem(key);
    sessionData = JSON.parse(decodeURI(sessionData));
    sessionData.push(obj);
    sessionStorage.setItem(key, encodeURI(JSON.stringify(sessionData)));
  } else {
    sessionStorage.setItem(key, encodeURI(JSON.stringify([obj])));
  }
};

const sessionStorageProvider = (obj) => {
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
      logSessionStorage(target.accesskey, logObj);
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
      logSessionStorage(target.accesskey, logObj);
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
      logSessionStorage(target.accesskey, logObj);
      return delete target[key];
    },
  });
};

export default sessionStorageProvider;
