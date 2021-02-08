import _, { getDataType } from "../dist/index.es.js";
import dayjs from "dayjs";

console.log(getDataType({}));
console.log(_.isQq.test("10086"));
console.log(_.get([{ name: "mySkey" }], "[0]"));
console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
