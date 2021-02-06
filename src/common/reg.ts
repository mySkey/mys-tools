const reg = {
  isEmail: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,
  isPhone: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
  isNoPc: /(Android|webOS|iPhone|iPad|iPod|BlackBerry)/gi,
  isInternet: /\w+:\/\/\w+\.\w+/,
  isFloat: /^\d+\.\d+$/,
  isChineseName: /^\d+\.\d+$/,
};

export const {
  isEmail,
  isPhone,
  isNoPc,
  isInternet,
  isFloat,
  isChineseName,
} = reg;

export {
  reg,
  reg as default
}