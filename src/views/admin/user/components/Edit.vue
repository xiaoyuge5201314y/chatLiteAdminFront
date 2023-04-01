<!--
 * @Description: 
 * @version: 1.0
 * @Author: 吴东宇
 * @Date: 2023-02-06 14:16:18
 * @LastEditors: 吴东宇
 * @LastEditTime: 2023-02-06 14:15:02
-->
<script setup lang="ts">
import { errorMessage, successMessage } from "@/utils/message";
const props = defineProps({
  dialogType: {
    type: String as PropType<"new" | "edit">,
    default: "new"
  },
  row: {
    type: Object,
    default() {
      return {};
    }
  }
});
const emits = defineEmits(["close", "complete"]);
const formRef = ref();
const formData = reactive({});
const rules = {};

function onClose() {
  emits("close");
}

function onComplete() {
  unref(formRef).validate(flag => {
    if (!flag) return errorMessage("请检查必填项");
    if (props.dialogType === "new") {
      onSave();
    }
    if (props.dialogType === "edit") {
      onEdit();
    }
  });
}

async function onSave() {
  successMessage("保存成功");
  emits("complete");
}

async function onEdit() {
  successMessage("更新成功");
  emits("complete");
}

function init() {
  if (props.dialogType === "edit") {
    
  }
}

init();
</script>
<template>
  <div>
    <el-dialog
      width="400"
      :title="props.dialogType === 'edit' ? '编辑' : '新增'"
      :model-value="true"
      :before-close="onClose"
    >
      <el-form
        ref="formRef"
        label-width="100px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="XXXX" prop="XXXX">
          <!-- <InputBox keyId="XXX" :fo /> -->
        </el-form-item>
      </el-form>
      <footer class="footer flex justify-end">
        <el-button type="" @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onComplete">确 定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<style scoped></style>
