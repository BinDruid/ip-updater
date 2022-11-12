import got from "got";
import * as config from "../config/configuratios.js";
import { needUpdate, currentIP } from "./util/need_update.js";
import logger from "../config/winston.js";

if (!needUpdate()) logger.info(`Same IP: ${currentIP}. No changes made.`);
else {
  const promises = [];
  for (const url of config.updateUrls) {
    promises.push(
      got(url, {
        method: "PATCH",
        headers: config.headers,
        json: {
          content: currentIP,
        },
      }).json()
    );
  }
  try {
    await Promise.all(promises);
  } catch (err) {
    logger.error(err.message, err);
  }
  logger.info(`New IP set to: ${currentIP}`);
}
