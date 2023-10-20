import React, { useEffect, useState } from "react";
import moment from "moment";
// api
import { getTaskReportListApi } from "@/api";
// config
import { config } from "@/util/config";
// css
import "./style.scss";

const MonitoringReport = (props) => {
  const [monitorData, updateMonitorData] = useState([
    {
      fileName: "192.168.32.12-监测结果.doc",
      createTime: "2023-10-01 08:00:00",
      createUserName: "张三",
    },
    {
      fileName: "192.168.32.12-监测结果.doc",
      createTime: "2023-10-01 08:00:00",
      createUserName: "张三",
    },
    {
      fileName: "192.168.32.12-监测结果.doc",
      createTime: "2023-10-01 08:00:00",
      createUserName: "张三",
    },
    {
      fileName: "192.168.32.12-监测结果.doc",
      createTime: "2023-10-01 08:00:00",
      createUserName: "张三",
    },
    {
      fileName: "192.168.32.12-监测结果.doc",
      createTime: "2023-10-01 08:00:00",
      createUserName: "张三",
    },
  ]);
  let wrapRef = null;
  let [timer, updateTimer] = useState(null);
  const getElement = () => {
    wrapRef = document.getElementById("monitorReportWrap");
    const firstChild = wrapRef.firstElementChild;
    const cloneChild = firstChild.cloneNode(true);
    wrapRef.appendChild(cloneChild);
  };

  const move = () => {
    if (wrapRef.scrollLeft < (monitorData.length - 1) * 262) {
      wrapRef.scrollLeft += 1;
    } else {
      wrapRef.scrollLeft = 0;
    }
  };
  const loop = () => {
    getElement();
    timer = setInterval(move, 10);
    updateTimer(timer);
  };

  const getTaskReportList = () => {
    const endTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const startTime = moment()
      .subtract(24, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    const rangeTime = [startTime, endTime];
    getTaskReportListApi({ rangeTime }).then((res) => {
      if (res.httpStatus === config.API_SUCCESS_CODE) {
        console.log(res.entity, "res.entity");
        updateMonitorData(res.entity);
        loop();
      }
    });
  };
  const mousemoverhandler = () => {
    console.log(111111, timer);
    // timer = null;
    clearInterval(timer);
    updateTimer(null);
  };
  const mousemouthandler = () => {
    loop();
  };
  const handleJump = () => {
    const jumpUrl = "/assetmanagement/AManagement/assetlist";
    const paramsStr = `?rangeTime=${rangeTime}`;
    window.open(`${window.top.location.origin}/#${jumpUrl}${paramsStr}`);
  };
  useEffect(() => {
    getTaskReportList();
  }, []);
  return (
    <div className="monitoring-report" id="monitorReportWrap">
      <ul
        className="monitoring-report-list"
        id="monitoringReportList"
        onMouseOver={mousemoverhandler}
        onMouseOut={mousemouthandler}
      >
        {monitorData.map((x) => {
          return (
            <li>
              <img src={require("./images/file.png")} />
              <div className="monitoring-report-item-info">
                <p>{x.fileName}</p>
                <p>
                  <span>{x.createTime}</span>
                  <span>{x.createUserName}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MonitoringReport;
