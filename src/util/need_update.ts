import axios from "axios"
import * as config from "../../config/configurations.js"

const { data } = await axios.get(config.externalIPCheck)
const currentIP = data.ip
const networkID: string = currentIP.split(".")[0]
const oldIP = config.cloudFlareIP

const needUpdate = () =>
  !config.proxyNetwork.includes(networkID) && currentIP !== oldIP

export { needUpdate, currentIP }
