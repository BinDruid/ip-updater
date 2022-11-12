import got from "got";
import * as config from "../../config/configuratios.js";
import logger from "../../config/winston.js";

const currentIP = (await got(config.externalIPCheck).json()).ip;
const networkID = currentIP.split(".")[0];
let oldIP;
try {
  oldIP = (
    await got(config.updateUrls[0], {
      method: "GET",
      headers: config.headers,
    }).json()
  ).result.content;
} catch (err) {
  logger.error(err.message, err);
}
const needUpdate = () =>
  !config.proxyNetwork.includes(networkID) && currentIP !== oldIP;
export { needUpdate, currentIP };
