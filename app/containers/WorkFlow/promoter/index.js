import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Drawer, Input, Layout, Form, Alert } from "antd";
import { UserOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";

// context
import Context from "../context";

// components
import AddNode from "../addNode";

// css
import "./style.scss";

const { Header, Footer, Content } = Layout;
const Promoter = (props) => {
  console.log(props, "props-promoter");
  const { select } = useContext(Context);
  const nodeTitleRef = useRef(null);
  const [form, updateForm] = useState({});
  const [isEditTitle, updateIsEditTitle] = useState(false);
  const [open, updateOpen] = useState(false);
  const [node, updateNode] = useState(props.nodeConfig || {});
  const toText = () => {
    if (node.nodeRoleList && node.nodeRoleList.length > 0) {
      return node.nodeRoleList.map((item) => item.name).join("、");
    } else {
      return "所有人";
    }
  };
  const handleShow = () => {
    const stateForm = { ...node };
    updateForm(stateForm);
    updateIsEditTitle(false);
    updateOpen(true);
  };
  const handleEditTitle = () => {
    updateIsEditTitle(true);
    setTimeout(() => {
      nodeTitleRef.current.focus();
    }, 100);
  };
  const handleSaveTitle = (e) => {
    const stateForm = { ...form };
    stateForm.nodeName = e.target.value;
    updateForm(stateForm);
    updateIsEditTitle(false);
  };
  const handleSelectHandle = (type, list) => {
    select(type, list);
  };
  useEffect(() => {
    updateNode(props.nodeConfig);
  }, []);
  console.log(form, "form", node);
  return (
    <React.Fragment>
      <div className="node-wrap">
        <div className="node-wrap-box start-node" onClick={handleShow}>
          <div className="title" style={{ background: "#576a95" }}>
            <UserOutlined />
            <span>{node.nodeName}</span>
          </div>
          <div className="content">
            <span>{toText()}</span>
          </div>
        </div>
        <AddNode nodes={node.childNode} />
      </div>
      <Drawer
        className="promoter-drawer"
        placement="right"
        open={open}
        closable={false}
        width={500}
      >
        <div className="node-wrap-drawer-title">
          {!isEditTitle ? (
            <label onClick={handleEditTitle}>
              <span>{form.nodeName}</span>
              <FormOutlined className="node-wrap-drawer-title-edit" />
            </label>
          ) : (
            <Input
              ref={nodeTitleRef}
              defaultValue={form.nodeName}
              onBlur={(e) => handleSaveTitle(e)}
            />
          )}
        </div>
        <Content>
          <Form label-position="top">
            <Form.Item label="谁可以发起此审批">
              <Button
                type="primary"
                shape="round"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => handleSelectHandle(2, form.nodeRoleList)}
              >
                选择角色
              </Button>
              {/* <div class="tags-list">
								<el-tag v-for="(role, index) in form.nodeRoleList"  type="info" closable >{role.name}</el-tag>
							</div> */}
            </Form.Item>
            {form.nodeRoleList && form.nodeRoleList.length == 0 ? (
              <Alert
                message="不指定则默认所有人都可发起此审批"
                type="warning"
              />
            ) : null}
          </Form>
        </Content>
        <Footer>
          <Button type="primary">保存</Button>
          <Button>取消</Button>
        </Footer>
      </Drawer>
    </React.Fragment>
  );
};

export default Promoter;
