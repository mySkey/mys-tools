import common from './common'
import reg from './common/reg'

export {
  reg,
  common,
  common as default
}

console.log(common.isDataType('hello world'))