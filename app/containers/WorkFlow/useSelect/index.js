import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, Tree } from "antd";
import { RightOutlined } from "@ant-design/icons";

// data
import Api from "./data";
// css
import "./style.scss";

const { TreeNode } = Tree;

const UseSelect = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({ show }));
  const [type, updateType] = useState(1);
  const [selected, updateSelected] = useState([]);
  const [visible, updateVisible] = useState(false);
  const [roleList, updateRoleList] = useState([]);
  const titleMap = ["人员选择", "角色选择"];
  const show = (type, data) => {
    console.log("show", type, data);
    updateType(type);
    updateVisible(true);
    if (type === 1) {
      getGroup();
      getUser();
    } else if (type === 2) {
      getRole();
    }
  };
  const getGroup = () => {
    const groupList = Api.userOrgTreeSelector.get().data;
    console.log(groupList, "groupList");
  };
  const getUser = () => {
    const userList = Api.userSelector.get().data;
    console.log(userList, "userList");
  };
  const getRole = () => {
    const roleList = Api.userRoleSelector.get().data;
    console.log(roleList, "roleList");
    updateRoleList(roleList);
  };
  const renderTreeNode = (data = []) => {
    console.log(data, "data");
    return data.map((item) => {
      return (
        <TreeNode
          key={item.id || item.type}
          title={
            <span className="tree-node-title tree-node-title-group">
              {item.label}
            </span>
          }
        >
          {item.children && renderTreeNode(item.children)}
        </TreeNode>
      );
    });
  };
  const handleCancel = () => {
    updateVisible(false);
  };
  const handleChecked = (keys, { checked }) => {
    console.log(keys, "keys", checked);
  };
  return (
    <Modal
      title={titleMap[type - 1]}
      open={visible}
      className="use-select"
      okText="确认"
      cancelText="取消"
      onCancel={handleCancel}
    >
      <React.Fragment>
        <div className="sc-user-select sc-user-select-role">
          <div className="sc-user-select-left">
            <div className="sc-user-select-select">
              <div className="sc-user-select-tree">
                <Tree checkable onCheck={handleChecked}>
                  {renderTreeNode(roleList)}
                </Tree>
              </div>
            </div>
          </div>
          <div className="sc-user-select-toicon">
            <RightOutlined />
          </div>
          <div className="sc-user-select-selected">
            <header>已选 ({selected.length})</header>
            <ul>
              {/* <li v-for="(item, index) in selected" :key="item.id">
								<span class="name">
									<label>{{item.name}}</label>
								</span>
								<span class="delete">
									<el-button type="danger" icon="el-icon-delete" circle size="small" @click="deleteSelected(index)"></el-button>
								</span>
							</li> */}
            </ul>
          </div>
        </div>
      </React.Fragment>
    </Modal>
  );
});

export default UseSelect;
