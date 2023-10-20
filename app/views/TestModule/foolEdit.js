/*
 * @Author: wangc
 * @Date: 2018-11-07 16:03:21
 * @LastEditors: wangc
 * @LastEditTime: 2018-11-14 19:08:35
 * @Description: 小白编辑
 * @Email: wangcheng@hiynn.com
 */

export default [
  {
    name: "是否打开动画",
    editor: "CheckBox",
    pipe: ["option", "animation", "show"]
  },
  {
    name: "动画时间",
    editor: "Number",
    pipe: ["option", "animation", "time"]
  },
  {
    name: "动画等待时间",
    editor: "Number",
    pipe: ["option", "animation", "pauseTime"]
  },
  {
    name: "显示行数",
    editor: "Number",
    pipe: ["option", "row"]
  },
  {
    name: "是否显示头部",
    editor: "CheckBox",
    pipe: ["option", "headerShow"]
  },
  {
    name: "头部背景色",
    editor: "Color",
    pipe: ["option", "headerStyle", "backgroundColor"]
  },
  {
    name: "单数行背景色",
    editor: "Color",
    pipe: ["option", "singularLine", "backgroundColor"]
  },
  {
    name: "双数行背景色",
    editor: "Color",
    pipe: ["option", "pluralLine", "backgroundColor"]
  },
  {
    name: "是否显示排名",
    editor: "CheckBox",
    pipe: ["option", "mark", "show"]
  },
  {
    name: "排名填充值",
    editor: "Textarea",
    pipe: ["option", "mark", "name"]
  }
];
