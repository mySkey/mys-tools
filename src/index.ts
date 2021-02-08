import * as common from "./common/index";
import MysReg from "./common/reg";

const mysTools = {
  ...common,
  ...MysReg
};

export const {
  get,
  cloneDeep,
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
} = mysTools;
export default mysTools;
