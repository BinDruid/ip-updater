import axios from "axios"
import logger from "../config/winston.js"
import * as config from "../config/configurations.js"
import { needUpdate, currentIP } from "./util/need_update.js"
import FS from "fs"
const fs = FS.promises
if (!needUpdate()) logger.info(`Same IP: ${currentIP}. No changes made.`)
else {
  const promises = []
  for (const url of config.updateUrls) {
    promises.push(
      axios.patch(url, { content: currentIP }, { headers: config.headers })
    )
  }
  promises.push(
    fs.writeFile(
      "./config/cloud_ip.json",
      JSON.stringify({ cloudIP: currentIP })
    )
  )
  try {
    await Promise.all(promises)
  } catch (err: any) {
    logger.error(err.message, err)
  }
  logger.info(`New IP set to: ${currentIP}`)
}
