import Generator from "license-key-generator";

const options = {
  type: "random", // default "random"
  length: 16, // default 16
  group: 4, // default 4
  split: "-", // default "-"
  splitStatus: true, // default true
};
const code = new Generator(options);

export default code;
