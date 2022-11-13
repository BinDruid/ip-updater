import dotenv from "dotenv";
dotenv.config();
import FS from "fs";
const fs = FS.promises;
import config from "config";

export const headers = {
  "Content-Type": "application/json",
  "X-Auth-Email": process.env.EMAIL,
  "X-Auth-Key": process.env.AUTH_KEY,
};
export const externalIPCheck = "https://api.ipify.org?format=json";
export const cloudFlareUrl = "https://api.cloudflare.com/client/v4/zones";
export const proxyNetwork = ["49"];
export const InitialUrl = process.env.INITIAL_URL;
export const cloudFlareIP = (JSON.parse(await fs.readFile("./config/cloud_ip.json"))).cloudIP
export const updateUrls = config.get("updateUrl");
export const excludedDomains = config.get("excludedDomains");
