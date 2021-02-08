(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var __assign = function () {
    __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };

  var get = function (obj, key, defaultValue) {
      var result = obj;
      for (var _i = 0, _a = key.split("."); _i < _a.length; _i++) {
          var k = _a[_i];
          if (Array.isArray(result))
              k = k.replace(/(\[|\])/gi, "");
          if (result[k]) {
              result = result[k];
          }
          else {
              result = false;
              break;
          }
      }
      return result || defaultValue;
  };
  var cloneDeep = function (obj) {
      if (typeof obj !== "object")
          return obj;
      var newObj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              newObj[key] =
                  typeof obj[key] !== "object" ? obj[key] : cloneDeep(obj[key]);
          }
      }
      return newObj;
  };
  var htmlCharset = [
      { key: "&nbsp;", label: " " },
      { key: "&lt;", label: "<" },
      { key: "&gt;", label: ">" },
      { key: "&amp;", label: "&" },
      { key: "&quot;", label: '"' },
      { key: "&apos;", label: "'" },
      { key: "&yen;", label: "¥" },
      { key: "&copy;", label: "©" },
      { key: "&times;", label: "×" },
      { key: "&divide;", label: "÷" }
  ];
  // localStorage操作
  var setStorage = function (key, value) {
      try {
          localStorage.setItem(key, JSON.stringify(value));
      }
      catch (err) {
          console.log("localStorage\u5B58\u50A8" + key + "\u5931\u8D25", err);
      }
  };
  var getStorage = function (key) {
      var result;
      try {
          var value = localStorage.getItem(key) || "";
          result = JSON.parse(value);
      }
      catch (err) {
          console.log("localStorage\u83B7\u53D6" + key + "\u5931\u8D25", err);
      }
      return result;
  };
  var removeStorage = function (key) {
      localStorage.removeItem(key);
  };
  var clearStorage = function () {
      localStorage.clear();
  };
  // sessionStorage操作
  var setSessionStorage = function (key, value) {
      try {
          sessionStorage.setItem(key, JSON.stringify(value));
      }
      catch (err) {
          console.log("sessionStorage\u5B58\u50A8" + key + "\u5931\u8D25", err);
      }
  };
  var getSessionStorage = function (key) {
      var result;
      try {
          var value = sessionStorage.getItem(key) || "";
          result = JSON.parse(value);
      }
      catch (err) {
          console.log("sessionStorage\u83B7\u53D6" + key + "\u5931\u8D25", err);
      }
      return result;
  };
  var removeSessionStorage = function (key) {
      sessionStorage.removeItem(key);
  };
  var clearSessionStorage = function () {
      sessionStorage.clear();
  };
  // JSON操作
  var stringify = function (value) {
      try {
          JSON.stringify(value);
      }
      catch (err) {
          console.log("JSON.stringify\u9519\u8BEF:", err);
      }
  };
  var parse = function (value) {
      var result;
      try {
          result = JSON.parse(value);
      }
      catch (err) {
          console.log("JSON.parse\u9519\u8BEF:", err);
      }
      return result;
  };
  // html字符操作
  var htmlEncode = function (str) {
      var regStr = "(" + htmlCharset.map(function (item) { return item.label; }).join("|") + ")";
      var result = str.replace(new RegExp(regStr, "gi"), function (t) {
          var item = htmlCharset.find(function (item) { return item.label === t; });
          return item.key;
      });
      return result;
  };
  var htmlDecode = function (str) {
      var regStr = "(" + htmlCharset.map(function (item) { return item.key; }).join("|") + ")";
      var result = str.replace(new RegExp(regStr, "gi"), function (t) {
          var item = htmlCharset.find(function (item) { return item.key === t; });
          return item.label;
      });
      return result;
  };
  // 判断数据类型
  var getDataType = function (data) {
      var value = Object.prototype.toString.call(data);
      var result = value.match(/\[object (\S*)\]/)[1];
      return result.toLocaleLowerCase();
  };
  // 下载文件
  var downloadFile = function (url) {
      var iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
      iframe.style.height = "0"; // 防止影响页面
      iframe.src = url;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(function () {
          iframe.remove();
      }, 5 * 60 * 1000);
  };
  var paramesToStr = function (parames) {
      var res = "?";
      for (var key in parames) {
          res += key + "=" + parames[key] + "&";
      }
      return res.slice(0, res.length - 1);
  };
  var strToParames = function (str) {
      var result = {};
      if (str.includes("?")) {
          var paramesStr = str.slice(str.indexOf("?") + 1);
          paramesStr.split("&").forEach(function (item) {
              var _a = item.split("="), key = _a[0], value = _a[1];
              result[key] = value;
          });
      }
      return result;
  };
  var checkFormRules = function (rules, d) {
      var result = false;
      var ruleObj = {
          required: function (_, val) { return !val; },
          len: function (base, val) { return base != val.length; },
          min: function (base, val) { return base > val.length; },
          max: function (base, val) { return base < val.length; },
          pattern: function (base, val) { return !base.test(val); }
      };
      var _loop_1 = function (i) {
          var _loop_2 = function (j) {
              var item = rules[i][j];
              var itemKeys = Object.keys(item).filter(function (key) {
                  return Object.keys(ruleObj).includes(key);
              });
              if (itemKeys.filter(function (key) { return ruleObj[key](item[key], d[i]); }).length > 0) {
                  result = item["message"];
                  return "break-outer";
              }
          };
          for (var j in rules[i]) {
              var state_2 = _loop_2(j);
              switch (state_2) {
                  case "break-outer": return state_2;
              }
          }
      };
      outer: for (var i in rules) {
          var state_1 = _loop_1(i);
          switch (state_1) {
              case "break-outer": break outer;
          }
      }
      return result;
  };
  /*
  1.右击数据，然后storage as global variable
  2.copy(temp1)
  3.Ctrl + v就能将打印内容copy出来
  */
  var debug = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var mode = get(process, "env.NODE_ENV", "");
      if (mode === "development")
          console.log.apply(console, args);
  };

  var common = /*#__PURE__*/Object.freeze({
      __proto__: null,
      get: get,
      cloneDeep: cloneDeep,
      setStorage: setStorage,
      getStorage: getStorage,
      removeStorage: removeStorage,
      clearStorage: clearStorage,
      setSessionStorage: setSessionStorage,
      getSessionStorage: getSessionStorage,
      removeSessionStorage: removeSessionStorage,
      clearSessionStorage: clearSessionStorage,
      stringify: stringify,
      parse: parse,
      htmlCharset: htmlCharset,
      htmlEncode: htmlEncode,
      htmlDecode: htmlDecode,
      getDataType: getDataType,
      downloadFile: downloadFile,
      paramesToStr: paramesToStr,
      strToParames: strToParames,
      checkFormRules: checkFormRules,
      debug: debug
  });

  /*
   * @Author: mySkey
   * @Date: 2021-02-07 15:54:40
   * @LastEditTime: 2021-02-07 16:30:02
   * @LastEditors: Please set LastEditors
   * @Description: In User Settings Edit
   * @FilePath: /mySkey/src/common/reg.ts
   */
  var MysReg = /** @class */ (function () {
      function MysReg() {
      }
      // 校验邮箱
      MysReg.isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      // 校验手机号
      MysReg.isPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      // 校验移动端
      MysReg.isNoPc = /(Android|webOS|iPhone|iPad|iPod|BlackBerry)/gi;
      // 校验域名
      MysReg.isInternet = /\w+:\/\/\w+\.\w+/;
      // 校验数字
      MysReg.isNumber = /^-?\d*\.?\d+$/; // 数字正则
      MysReg.isFloat = /^\d+\.\d+$/; // 浮点数正则
      MysReg.isPos = /^\d+$/; // 正整数正则
      // 校验中文名
      MysReg.isChineseName = /^\d+\.\d+$/;
      // 校验身份证号
      MysReg.isIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      // 校验IP地址
      MysReg.isIpv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      MysReg.isIpv6 = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
      // 校验十六进制颜色
      MysReg.isHex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
      // 校验qq号
      MysReg.isQq = /^[1-9][0-9]{4,10}$/;
      // 校验微信号
      MysReg.isWx = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
      // 校验车牌号
      MysReg.isCardNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
      // 校验中国邮编
      MysReg.isChinesePostcode = /^[1-9]\d{5}(?!\d)$/;
      // 校验经纬度正则
      // 经度
      MysReg.isLng = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
      // 纬度
      MysReg.isLat = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
      return MysReg;
  }());

  var mysTools = __assign(__assign({}, common), MysReg);
  mysTools.get; mysTools.cloneDeep; mysTools.setStorage; mysTools.getStorage; mysTools.removeStorage; mysTools.clearStorage; mysTools.setSessionStorage; mysTools.getSessionStorage; mysTools.removeSessionStorage; mysTools.clearSessionStorage; mysTools.stringify; mysTools.parse; mysTools.htmlCharset; mysTools.htmlEncode; mysTools.htmlDecode; var getDataType$1 = mysTools.getDataType; mysTools.downloadFile; mysTools.paramesToStr; mysTools.strToParames; mysTools.checkFormRules; mysTools.debug;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var dayjs_min = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return +(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else {var i=t.name;M[i]=t,r=i;}return !n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t);}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},$.$utils=function(){return g},$.isValid=function(){return !("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])};}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});
  });

  console.log(getDataType$1({}));
  console.log(mysTools.isQq.test("10086"));
  console.log(mysTools.get([{ name: "mySkey" }], "[0]"));
  console.log(dayjs_min().format("YYYY-MM-DD HH:mm:ss"));

})));
