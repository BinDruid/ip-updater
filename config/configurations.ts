import FS from "fs"
import dotenv from "dotenv"
import config from "config"
import { resolve } from "path"
import { AxiosRequestConfig } from "axios"

dotenv.config()
const fs = FS.promises
const cwd = process.cwd()

export const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
  "X-Auth-Email": process.env.EMAIL,
  "X-Auth-Key": process.env.AUTH_KEY,
}
export const externalIPCheck: string = "https://api.ipify.org?format=json"
export const cloudFlareUrl: string =
  "https://api.cloudflare.com/client/v4/zones"
export const proxyNetwork: string[] = ["49", "159", "172", "151", "193"]
export const InitialUrl: string = process.env.INITIAL_URL!
export const cloudFlareIP = JSON.parse(
  await fs.readFile(resolve(cwd, "./config/cloud_ip.json"), {
    encoding: "utf-8",
  })
).cloudIP
export const updateUrls: string = config.get("updateUrl")
export const excludedDomains: string[] = config.get("excludedDomains")
