import React, { useEffect, useState } from "react";
import moment from "moment";
// api
import { getDeadlineApi } from "@/api";
// config
import { config } from "@/util/config";
// css
import "./style.scss";
const countDown = (props) => {
  const format = "YYYY-MM-DD HH:mm:ss";
  const isReset = false;
  const [deadline, updateDeadline] = useState("");
  const [{ current, updater }, setCurrent] = useState({
    current: moment(), // 当前时间
    updater: 0,
  });
  const [remains, setRemains] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const initCountDown = () => {
    const timer = setInterval(() => {
      current.isSameOrAfter(moment(deadline, format))
        ? clearInterval(timer)
        : setCurrent((prev) => ({
            current: prev.current.add(1, "s"),
            updater: prev.updater + 1,
          }));
    }, 1000);
    // 切换时间，重置计时
    if (isReset) {
      setCurrent((prev) => ({
        current: moment(),
        updater: 0,
      }));
    }
    return () => clearInterval(timer);
  };
  const getDeadline = () => {
    getDeadlineApi({}).then((res) => {
      if (res.httpStatus === config.API_SUCCESS_CODE) {
        if (res.entity) {
          updateDeadline(res.entity);
          initCountDown();
        }
      }
    });
  };
  useEffect(() => {
    getDeadline();
  }, []);
  // current 变化，计算相差多长时间
  useEffect(() => {
    // 结束时间和当前时间差值
    let millisec = moment(deadline, format).valueOf() - current.valueOf();
    millisec = millisec >= 0 ? millisec : 0;
    // 用毫秒数得到秒、分、小时和天
    setRemains({
      day: Math.floor(millisec / (1000 * 60 * 60 * 24)),
      hour: Math.floor((millisec / (1000 * 60 * 60)) % 24),
      minute: Math.floor((millisec / (1000 * 60)) % 60),
      second: Math.round((millisec / 1000) % 60),
    });
  }, [updater]);

  return (
    <p className="count-down-text">{`${remains.day}天${remains.hour}时${remains.minute}分${remains.second}秒`}</p>
  );
};

export default countDown;
