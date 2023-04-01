<!--
 * @Description:消息管理
 * @version: 1.0
 * @Author: 吴东宇
 * @Date: 2023-02-06 14:16:18
 * @LastEditors: 吴东宇
 * @LastEditTime: 2023-02-06 14:15:02
-->

<script lang="ts" setup>
import { useList } from "@/hook/useList";
import { reactive } from "vue";
import { useDialog } from "@/hook/useDialog";
import { message } from "@/utils/message";
import TableBox from "@/components/Table/TableBox.vue";
import { messageList } from "@/api/ai";

const { openDialog, closeDialog, dialog } = useDialog();
const listQuery = reactive({});
const { total, list, pageQuery, onSearch, onReset, currentChange, sizeChange } =
  useList(messageList, listQuery);

function openAdd() {
  openDialog("new");
}

function openEdit(row) {
  openDialog("edit", row);
}

function closeAdd() {
  closeDialog("new");
}

function closeEdit() {
  closeDialog("edit");
  init();
}

function addComplete() {
  closeAdd();
}

function editComplete() {
  closeEdit();
}

function onEnable(row) {
  message("成功");
  onSearch();
}

function onDisable(row) {
  onSearch();
}

function onDelete() {
  ElMessageBox.confirm("确定要删除吗？", {
    type: "error"
  })
    .then(() => {
      onSearch();
    })
    .catch(() => ({}));
}

onSearch();
</script>
<template>
  <div>
    <TableBox
      :total="total"
      :current="pageQuery.current"
      :size="pageQuery.size"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
      <template #header>
        <el-button type="success" @click="openDialog('add')">新增</el-button>
        <QueryBox @search="onSearch" @reset="onReset">
          <template #show>
            <QueryItem> 123</QueryItem>
          </template>
          <template #addBtn>
            <el-button type="primary">新 增</el-button>
          </template>
        </QueryBox>
      </template>
      <template #default>
        <el-table :data="list">
          <el-table-column width="70px" label="序号" type="index" prop="AAAA" />
          <el-table-column
            min-width="100px"
            label="模型名称"
            prop="aiModelId"
          />
          <el-table-column min-width="100px" label="用户" prop="userId" />
          <el-table-column
            min-width="100px"
            label="创建时间"
            prop="createTime"
          />
          <el-table-column
            min-width="100px"
            label="更新时间"
            prop="updateTime"
          />
          <el-table-column
            min-width="100px"
            label="操作"
            fixed="right"
            width="250px"
          >
            <template #default="{ row }">
              <el-button link type="primary" @click="openEdit(row)"
                >编辑
              </el-button>
              <el-button link type="success" @click="onEnable(row)"
                >启用
              </el-button>
              <el-button link type="danger" @click="onDisable(row)"
                >禁用
              </el-button>
              <el-button link type="danger" @click="onDelete(row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBox>
<!--      <Edit v-if="dialog['new']" @close="closeAdd" @complete="addComplete" />-->
    <!--    <Edit-->
    <!--      v-if="dialog['edit']"-->
    <!--      :row="dialog['row']"-->
    <!--      :dialog-type="'edit'"-->
    <!--      @close="closeEdit"-->
    <!--      @complete="editComplete"-->
    <!--    />-->
  </div>
</template>

<style lang="scss" scoped></style>
