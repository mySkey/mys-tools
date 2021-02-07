import common from "./common";
import reg from "./common/reg";

export { reg, common as default };

export const {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
  stringify,
  parse,
  htmlCharset,
  htmlEncode,
  htmlDecode,
  getDataType,
  downloadFile,
  paramesToStr,
  strToParames,
  checkFormRules,
  debug
} = common;
