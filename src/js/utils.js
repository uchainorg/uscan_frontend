/*
 * startDate==>开始时间
 * endDate==>结束时间
 * 事例：diffTime(data.createTime,new Date())
 *
 * */
export function diffTime(startDate, endDate) {
  var diff = endDate.getTime() - startDate; //.getTime();//时间差的毫秒数

  //计算出相差天数
  var days = Math.floor(diff / (24 * 3600 * 1000));

  //计算出小时数
  var leave1 = diff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);

  var returnStr = seconds + " secs ago";

  if (seconds > 0) {
    if (seconds == 1) {
      returnStr = seconds + " sec ago"; //+ returnStr;
    }
  }

  if (minutes > 0) {
    if (minutes == 1) {
      returnStr = minutes + " min ago"; //+ returnStr;
    } else {
      returnStr = minutes + " mins ago"; //+ returnStr;
    }
  }
  if (hours > 0) {
    if (hours == 1) {
      returnStr = hours + " hour ago"; // + returnStr;
    }
    returnStr = hours + " hours ago"; // + returnStr;
  }
  if (days > 0) {
    if (days == 1) {
      returnStr = days + " day ago"; // + returnStr;
    } else {
      returnStr = days + " days ago"; //+ returnStr;
    }
  }
  return returnStr;
}

export function formatTimestamp(timestamp) {
  // console.log("formatTimestamp", timestamp);
  let createTime = new Date(parseInt(timestamp)) * 1000;
  let date = new Date(parseInt(timestamp) * 1000).toUTCString();
  return diffTime(createTime, new Date()) + "(" + date + ")";
}
