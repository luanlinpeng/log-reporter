import FingerprintJS from '@fingerprintjs/fingerprintjs'

export async function getFinger() {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  return result.visitorId;
}

export * from "./nanooid";
export  * from './autoReport';