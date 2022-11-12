import * as config from "../../config/configuratios.js";
import got from "got";
import FS from "fs";
import { loggers } from "winston";
const fs = FS.promises;

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
  for (const website of result)
    urlConfig.websites.push((({ id, name }) => ({ id, name }))(website));

  for (const zone of urlConfig.websites) {
    const { result } = await got(websiteUrl + "/" + zone.id + "/dns_records", {
      method: "GET",
      headers: header,
    }).json();
    for (const record of result)
      if (record.name !== config.arvanDomain && record.name !== config.arvanWeb)
        urlConfig.updateUrl.push(
          websiteUrl + "/" + zone.id + "/dns_records" + "/" + `${record.id}`
        );
  }
  await fs.writeFile("./config/default.json", JSON.stringify(urlConfig));
} catch (err) {
  loggers.error(err.message, err);
}
console.log("Url configuration has been set.");
