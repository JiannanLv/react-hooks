import React from "react";
import { Button, Popover } from "antd";
import {
  UserOutlined,
  SendOutlined,
  ShareAltOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// css
import "./style.scss";

const AddNode = (props) => {
  console.log(props, "props-add-node");
  return (
    <div class="add-node-btn-box">
      <div class="add-node-btn">
        <Popover
          placement="topRight"
          overlayClassName="add-node-popover"
          overlayStyle={{ width: "270px" }}
          trigger="click"
          content={
            <React.Fragment>
              <div class="add-node-popover-body">
                <ul>
                  <li>
                    <UserOutlined style={{ color: "#ff943e" }} />
                    <p>审批节点</p>
                  </li>
                  <li>
                    <SendOutlined style={{ color: "#3296fa" }} />
                    <p>抄送节点</p>
                  </li>
                  <li>
                    <ShareAltOutlined style={{ color: "#15BC83" }} />
                    <p>条件分支</p>
                  </li>
                </ul>
              </div>
            </React.Fragment>
          }
        >
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </Popover>
      </div>
    </div>
  );
};

export default AddNode;
