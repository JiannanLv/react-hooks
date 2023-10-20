/**
 * @param {string} type action类型，必选字段
 * @param {object} args 请求参数
 * @return {object} action对象
 */
export default (type, ...argNames) =>
  (...args) => {
    const action = {
      type,
    };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
