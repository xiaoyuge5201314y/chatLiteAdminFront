type InputType =
  | "input"
  | "select"
  | "peopleSearch"
  | "deptSearch"
  | "radio"
  | "date";

interface InputConfig {
  type?: InputType; // 组件类型
  placeholder?: string; // 默认提示 优先级高于attrs只支持最外层的元素
  formData?: any; // 表单对象
  idKey?: string; // 绑定的数据key
  options?: { code: number; label: string }[]; // 枚举
  attrs?: any; // 组件属性
  isCompose?: boolean; // 是否是组合组件
  keyOptions?: any[]; // 组合组件中键的枚举
  chooseKey?: string; // 组合组件中键的值
  // chooseFormData?: any 组合组件中键所在的表单 已废弃 合并到formData中
  [srcProps: string]: any; // 其他属性（原生props属性）
}
// 文本输入
function inputHandle(props: InputConfig, { slots }) {
  if (props.isCompose) {
    return inputComposeHandle(props, { slots });
  }
  const { formData, idKey, attrs } = props;
  const { [idKey]: id } = toRefs(formData);
  return (
    <el-input
      v-slots={slots}
      {...attrs}
      model-value={unref(id)}
      onUpdate:modelValue={data => id && (id.value = data)}
    ></el-input>
  );
}
function inputComposeHandle(props: InputConfig, { slots }) {
  const { chooseKey, keyOptions, formData } = props;
  const $select = selectHandle({
    formData,
    idKey: chooseKey,
    options: keyOptions
  });
  const $input = inputHandle(
    { ...props, idKey: formData[chooseKey], type: "input", isCompose: false },
    { slots }
  );
  watch(
    () => formData[chooseKey],
    () => {
      keyOptions.forEach(e => {
        formData[e.code] = "";
      });
    }
  );
  return (
    <div class="flex w-full">
      <div class="flex-grow-0">{$select}</div>
      <div class="w-full">{$input}</div>
    </div>
  );
}
// 单选
function radioHandle(props: InputConfig) {
  const { formData, idKey, options } = props;
  const { [idKey]: id } = toRefs(formData);
  return (
    <el-radio-group
      model-value={unref(id)}
      onUpdate:modelValue={data => (id.value = data)}
    >
      {options.map(item => (
        <el-radio label={item.code}>{item.label}</el-radio>
      ))}
    </el-radio-group>
  );
}
// 下拉选择
function selectHandle(props: InputConfig) {
  const { formData, idKey, options } = props;
  const { [idKey]: id } = toRefs(formData);
  return (
    <el-select
      {...props}
      class="w-full"
      model-value={id?.value}
      onUpdate:modelValue={data => (id ? (id.value = data) : "")}
    >
      {options.map(item => (
        <el-option label={item.label} value={item.code}></el-option>
      ))}
    </el-select>
  );
}

function dateHandle(props: InputConfig) {
  const { type, formData, idKey, attrs } = props;
  const { [idKey]: id } = toRefs(formData);
  return (
    <el-date-picker
      {...attrs}
      type={type}
      model-value={unref(id)}
      onUpdate:modelValue={data => (id.value = data)}
    ></el-date-picker>
  );
}
/**
 * @description formData里的属性必须声明 否则有可能报错
 * eg: formData = reactive({
 *    userIdList: [], // 这个必须声明
 *    userId:"",  // 这个必须声明
 * })
 * @param props
 * @param context
 * @returns
 */
export default function (props: InputConfig, context) {
  // 初始化参数
  props.options = props.options ?? [
    { code: 0, label: "否" },
    { code: 1, label: "是" }
  ];
  props.attrs = props.attrs ?? {};
  props.attrs.placeholder = props.placeholder ?? props.attrs.placeholder;
  if (!props.type || props.type === "input") {
    props.attrs.placeholder = props.attrs.placeholder ?? "请输入";
    return inputHandle(props, context);
  } else if (props.type === "radio") {
    return radioHandle(props);
  } else if (props.type === "select") {
    return selectHandle(props);
  } else if (props.type.startsWith("date")) {
    return dateHandle(props);
  }
  return "";
}
