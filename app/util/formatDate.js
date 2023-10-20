 // 时间戳转换时间
 export const formatDate = (time) => {
  let timestamp = new Date(time)
  return timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 0)
 }
