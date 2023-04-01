<!--
 * @Description: TableBox
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2022-07-19 13:47:02
 * @LastEditors: zengxianghui
 * @LastEditTime: 2023-03-05 15:17:49
-->
<script setup lang="ts">
const props = defineProps({
  hasFooter: {
    type: Boolean,
    default: true
  },
  // 是否有分页
  pagination: {
    type: Boolean,
    default: true
  },
  // 当前页
  current: {
    type: Number,
    default: 1
  },
  // 当前页展示记录数
  size: {
    type: Number,
    default: 20
  },
  // 总记录数
  total: {
    type: Number,
    default: 0
  },
  // 是否展示操作栏
  showToolbar: {
    type: Boolean,
    default: false
  },
  // content padding样式
  contentPadding: {
    type: String,
    default: "0"
  }
});

const emit = defineEmits(["ready", "currentChange", "sizeChange"]);

const currentPage = ref(props.current);
const tableContentHeight = ref(0);

onMounted(() => {
  const clientHeight = document.documentElement.clientHeight;
  const navBarHeight = 38 + 48 + 130; // 38(.vertical-header-right) 48(.scroll-container) 20(padding微调)
  const contentHeight = clientHeight - navBarHeight;
  const { proxy } = getCurrentInstance();
  const refs: any = proxy.$refs;
  const tableHeaderHeight = refs.tableHeader.clientHeight;
  const tableFooterHeight = refs.tableFooter.clientHeight;
  tableContentHeight.value =
    contentHeight - tableHeaderHeight - tableFooterHeight;
  emit("ready", tableContentHeight);
});

watchEffect(() => {
  if (props.current) {
    currentPage.value = props.current;
  }
});
</script>

<template>
  <div class="table-box">
    <!-- 筛选条件 -->
    <div ref="tableHeader" class="table-header">
      <slot name="header" />
    </div>

    <!-- 内容-->
    <div
      ref="tableContent"
      class="content"
      :style="{ padding: props.contentPadding }"
    >
      <div v-if="showToolbar" class="table-toolbar">
        <div class="toolbar-left">
          <slot name="toolbarLeft" />
        </div>
        <div class="toolbar-right">
          <slot name="toolbarRight" />
        </div>
      </div>

      <div id="xls-table">
        <slot :max-height="tableContentHeight" />
      </div>
    </div>
    <!-- 分页 -->
    <div v-show="hasFooter" ref="tableFooter" class="table-footer">
      <slot name="footer" />
      <template v-if="pagination">
        <el-pagination
          v-model:currentPage="currentPage"
          class="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100, 200]"
          :background="true"
          :page-size="props.size"
          :total="props.total"
          @size-change="emit('sizeChange', $event)"
          @current-change="emit('currentChange', $event)"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-box {
  padding-top: 0;

  .table-header {
    background: var(--el-bg-color);
  }

  .content {
    position: relative;
    background: var(--el-bg-color);

    .table-toolbar {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;

      .toolbar-left {
        display: flex;
      }

      .toolbar-right {
        display: flex;
      }
    }

    .toolbar-setting {
      display: flex;
      align-items: center;
      margin-left: 16px;

      .icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .refresh {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .setting {
      }
    }

    .absolute-icon {
      position: absolute;
      z-index: 9;
      right: 10px;
    }
  }

  .table-footer {
    padding: 6px 24px;
    background: var(--el-bg-color);
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    background: var(--el-bg-color);
  }
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0 6px;
}
</style>
