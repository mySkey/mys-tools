import lodash from "lodash";

const { get } = lodash

const htmlCharset = [
  { key: "&nbsp;", label: " " },
  { key: "&lt;", label: "<" },
  { key: "&gt;", label: ">" },
  { key: "&amp;", label: "&" },
  { key: "&quot;", label: '"' },
  { key: "&apos;", label: "'" },
  { key: "&yen;", label: "¥" },
  { key: "&copy;", label: "©" },
  { key: "&times;", label: "×" },
  { key: "&divide;", label: "÷" },
];

// localStorage操作
const setStorage = (key: string, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(`localStorage存储${key}失败`, err);
  }
};
const getStorage = (key: string) => {
  let result;
  try {
    const value = localStorage.getItem(key) || "";
    result = JSON.parse(value);
  } catch (err) {
    console.log(`localStorage获取${key}失败`, err);
  }
  return result;
};
const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
const clearStorage = () => {
  localStorage.clear();
};

// sessionStorage操作
const setSessionStorage = (key: string, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(`sessionStorage存储${key}失败`, err);
  }
};
const getSessionStorage = (key: string) => {
  let result;
  try {
    const value = sessionStorage.getItem(key) || "";
    result = JSON.parse(value);
  } catch (err) {
    console.log(`sessionStorage获取${key}失败`, err);
  }
  return result;
};
const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
const clearSessionStorage = () => {
  sessionStorage.clear();
};

// JSON操作
const stringify = (value) => {
  try {
    JSON.stringify(value);
  } catch (err) {
    console.log(`JSON.stringify错误:`, err);
  }
};
const parse = (value) => {
  let result;
  try {
    result = JSON.parse(value);
  } catch (err) {
    console.log(`JSON.parse错误:`, err);
  }
  return result;
};

// html字符操作
const htmlEncode = (str: string) => {
  const regStr = `(${htmlCharset.map((item) => item.label).join("|")})`;
  const result = str.replace(new RegExp(regStr, "gi"), function (t) {
    const item: any = htmlCharset.find((item) => item.label === t);
    return item.key;
  });
  return result;
};
const htmlDecode = (str: string) => {
  const regStr = `(${htmlCharset.map((item) => item.key).join("|")})`;
  const result = str.replace(new RegExp(regStr, "gi"), function (t) {
    const item: any = htmlCharset.find((item) => item.key === t);
    return item.label;
  });
  return result;
};

// 判断数据类型
const isDataType = (data) => {
  return Object.prototype.toString.call(data);
};

// 下载文件
const downloadFile = (url) => {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none"; // 防止影响页面
  iframe.style.height = "0"; // 防止影响页面
  iframe.src = url;
  document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
  // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
  setTimeout(() => {
    iframe.remove();
  }, 5 * 60 * 1000);
};

const paramesToStr = (parames) => {
  let res = "?";
  for (let key in parames) {
    res += `${key}=${parames[key]}&`;
  }
  return res.slice(0, res.length - 1);
};

const checkFormRules = (rules, d) => {
  let result = false;
  const ruleObj = {
    required: (_, val) => !val,
    len: (base, val) => base != val.length,
    min: (base, val) => base > val.length,
    max: (base, val) => base < val.length,
    pattern: (base, val) => !base.test(val),
  };
  outer: for (let i in rules) {
    inter: for (let j in rules[i]) {
      const item = rules[i][j];
      const itemKeys = Object.keys(item).filter((key) =>
        Object.keys(ruleObj).includes(key)
      );
      if (itemKeys.filter((key) => ruleObj[key](item[key], d[i])).length > 0) {
        result = item["message"];
        break outer;
      }
    }
  }
  return result;
};

const debug = (...args) => {
  const mode = get(process, "env.NODE_ENV", "");
  if (mode === "development") console.log(...args);
};

const common = {
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
  isDataType,
  downloadFile,
  paramesToStr,
  checkFormRules,
  debug,
};

export {
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
  isDataType,
  downloadFile,
  paramesToStr,
  checkFormRules,
  debug,
  common as default,
};