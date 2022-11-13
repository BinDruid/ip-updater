import * as config from "../../config/configuratios.js";
import got from "got";
import FS from "fs";
const fs = FS.promises;
import logger from "../../config/winston.js";

const websiteUrl = config.cloudFlareUrl;
const header = config.headers;
const urlConfig = {};
try {
  const { result } = await got(websiteUrl, {
    method: "GET",
    headers: header,
  }).json();

  urlConfig.websites = [];
  urlConfig.updateUrl = [];
  urlConfig.excludedDomains = config.excludedDomains;
  for (const website of result)
    urlConfig.websites.push((({ id, name }) => ({ id, name }))(website));

  for (const zone of urlConfig.websites) {
    const { result } = await got(websiteUrl + "/" + zone.id + "/dns_records", {
      method: "GET",
      headers: header,
    }).json();
    for (const record of result)
      if (!urlConfig.excludedDomains.includes(record.name))
        urlConfig.updateUrl.push(
          websiteUrl + "/" + zone.id + "/dns_records" + "/" + `${record.id}`
        );
  }
  await fs.writeFile("./config/default.json", JSON.stringify(urlConfig));
} catch (err) {
  logger.error(err.message, err);
}
console.log("Url configuration has been set.");
