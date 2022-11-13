import got from "got";
import * as config from "../../config/configuratios.js";

const currentIP = (await got(config.externalIPCheck).json()).ip;
const networkID = currentIP.split(".")[0];
const oldIP = config.cloudFlareIP;

const needUpdate = () =>
  !config.proxyNetwork.includes(networkID) && currentIP !== oldIP;
export { needUpdate, currentIP };
