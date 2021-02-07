import common from "./common";
import MysReg from "./common/reg";

const mysTools = {
  ...common,
  ...MysReg
};

export { common, MysReg };
export default mysTools;

console.log(common.get({name: '151'}, 'name', ''));
