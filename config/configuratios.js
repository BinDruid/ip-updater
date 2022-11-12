import dotenv from "dotenv";
dotenv.config();
import config from "config";

export const headers = {
  "Content-Type": "application/json",
  "X-Auth-Email": process.env.EMAIL,
  "X-Auth-Key": process.env.AUTH_KEY,
};
export const externalIPCheck = "https://api.ipify.org?format=json";
export const cloudFlareUrl = "https://api.cloudflare.com/client/v4/zones";
export const proxyNetwork = ["49"];
export const arvanDomain = process.env.ARVAN_DOMAIN;
export const arvanWeb = process.env.ARVAN_WWW;
export const updateUrls = config.get("updateUrl");
