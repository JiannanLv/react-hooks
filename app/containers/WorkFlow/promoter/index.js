import React from "react";
import { UserOutlined } from "@ant-design/icons";

// components
import AddNode from "../addNode";

// css
import "./style.scss";

const Promoter = (props) => {
  console.log(props, "props-promoter");
  const toText = () => {
    if (
      props.nodeConfig.nodeRoleList &&
      props.nodeConfig.nodeRoleList.length > 0
    ) {
      return props.nodeConfig.nodeRoleList.map((item) => item.name).join("、");
    } else {
      return "所有人";
    }
  };
  return (
    <div className="node-wrap">
      <div className="node-wrap-box start-node">
        <div className="title" style={{ background: "#576a95" }}>
          <UserOutlined />
          <span>{props.nodeConfig.nodeName}</span>
        </div>
        <div className="content">
          <span>{toText()}</span>
        </div>
      </div>
      <AddNode nodes={props.nodeConfig.childNode} />
      {/* <el-drawer title="发起人" v-model="drawer" destroy-on-close append-to-body :size="500">
			<template #header>
				<div class="node-wrap-drawer__title">
					<label @click="editTitle" v-if="!isEditTitle">{{form.nodeName}}<el-icon class="node-wrap-drawer__title-edit"><el-icon-edit /></el-icon></label>
					<el-input v-if="isEditTitle" ref="nodeTitle" v-model="form.nodeName" clearable @blur="saveTitle" @keyup.enter="saveTitle"></el-input>
				</div>
			</template>
			<el-container>
				<el-main style="padding:0 20px 20px 20px">
					<el-form label-position="top">
						<el-form-item label="谁可以发起此审批">
							<el-button type="primary" icon="el-icon-plus" round @click="selectHandle(2, form.nodeRoleList)">选择角色</el-button>
							<div class="tags-list">
								<el-tag v-for="(role, index) in form.nodeRoleList" :key="role.id" type="info" closable @close="delRole(index)">{{role.name}}</el-tag>
							</div>
						</el-form-item>
						<el-alert v-if="form.nodeRoleList.length==0" title="不指定则默认所有人都可发起此审批" type="info" :closable="false"/>
					</el-form>
				</el-main>
				<el-footer>
					<el-button type="primary" @click="save">保存</el-button>
					<el-button @click="drawer=false">取消</el-button>
				</el-footer>
			</el-container>
		</el-drawer> */}
    </div>
  );
};

export default Promoter;
