import FS from "fs"
import axios from "axios"
import logger from "../../config/winston.js"
import * as config from "../../config/configurations.js"
const fs = FS.promises

interface Zone {
  id: number
  name: string
}

interface Url {
  websites?: Zone[]
  updateUrl?: string[]
  excludedDomains?: string[]
}

interface Response {
  result: any
}

const websiteUrl = config.cloudFlareUrl
const headers = config.headers
const urlConfig: Url = {}
try {
  const { data } = await axios.get(websiteUrl, { headers })

  urlConfig.websites = []
  urlConfig.updateUrl = []
  urlConfig.excludedDomains = config.excludedDomains as string[]
  for (const website of data.result)
    urlConfig.websites.push((({ id, name }) => ({ id, name }))(website))

  for (const zone of urlConfig.websites) {
    const { data } = await axios.get(
      websiteUrl + "/" + zone.id + "/dns_records",
      { headers }
    )
    for (const record of data.result)
      if (!urlConfig.excludedDomains.includes(record.name))
        urlConfig.updateUrl.push(
          websiteUrl + "/" + zone.id + "/dns_records" + "/" + `${record.id}`
        )
  }
  await fs.writeFile("./config/default.json", JSON.stringify(urlConfig))
} catch (err: any) {
  logger.error(err.message, err)
}
console.log("Url configuration has been set.")
