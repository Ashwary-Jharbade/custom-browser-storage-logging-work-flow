import configuration from "./config.js";
import localStorage from "./localStorageProvider/localStorageProvider.js";
import sessionStorage from "./sessionStorageProvider/sessionStorageProvider.js";

const logProvider = (obj,para) => {
    const conf = new configuration();
    conf.setService(para);
    const service = conf.getService();

    if (service === "local" ) {
        return localStorage(obj); 
    } else if (service === "session") {
        return sessionStorage(obj);
    } else {
        return null;
    }
}   

export default logProvider;