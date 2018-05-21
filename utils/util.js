const App = getApp();

/*yyyy-MM-dd hh:mm:ss.S*/
const formatTimeByTpl = (date, fmt) => {
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

const formatMoney = n => {
  return Number(n.toFixed(2));
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns {Number}
 */
const accAdd = (arg1, arg2) => {
  let r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    }
    else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  }
  else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m
};
/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns
 */
const accSub = (arg1, arg2) => {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
/**
 * 乘法
 * @param arg1
 * @param arg2
 * @returns {Number}
 */
const accMul = (arg1, arg2) => {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};
/**
 * 除法
 * @param arg1
 * @param arg2
 * @returns {Number}
 */
const accDiv = (arg1, arg2) => {
  let t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {
  }
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1);
};

const urlEncode = (path, param) => {
  let i, url = '';
  for (i in param) url += '&' + i + '=' + param[i];
  return path + url.replace(/./, '?');
};

const navigateTo = (config) => {
  if(!App.globalData.tapFlag) return;
  App.globalData.tapFlag = false;
  config.url = urlEncode(config.url, config.params);
  config.complete = (()=>{
    App.globalData.tapFlag = true;
  });
  config.fail = config.fail || ((e) => {
    wx.showToast({
      title: e.errMsg,
      icon: "none",
      duration: 2000
    })
  });
  wx[config.type || 'navigateTo'](config);

};

const alert = (title) => {
  wx.showToast(
    {
      title:title,
      icon: "none",
    }
  )
};
const showHub = (title) => {
  wx.showLoading({
    title: title,
  })
};
const hideHub = (title) => {
  wx.hideLoading();
};
module.exports = {
  formatTimeByTpl,
  formatMoney,
  formatNumber,
  accAdd,
  accSub,
  accMul,
  accDiv,
  navigateTo,
  alert,
  showHub,
  hideHub
}
