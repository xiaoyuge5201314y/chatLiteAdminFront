<!--
 * @Description:公共检索
 * @Version: 1.0
 * @Author: zengxianghui
 * @Date: 2022-07-19 16:46:09
 * @LastEditors: zengxianghui
 * @LastEditTime: 2023-03-07 14:17:52
-->
<script setup lang="ts">
import { ElMessage } from "element-plus";

const props = defineProps({
  hasSearch: {
    type: Boolean,
    default: true
  },
  hasMore: {
    type: Boolean,
    default: true
  },
  hasAdd: {
    type: String,
    default: ""
  },
  // 按钮是否禁用
  addDisabled: {
    type: Boolean,
    default: false
  },
  addName: {
    type: String,
    default: "新 增"
  },
  hasReset: {
    type: Boolean,
    default: true
  },
  // 仅做展示使用
  isEmpty: {
    type: Boolean,
    default: false
  },
  searchMoreName: {
    type: String,
    default: "更多搜索"
  }
});

const state = reactive({
  moreVisible: false
});

const emit = defineEmits(["reset", "search", "add"]);

const onAdd = () => {
  emit("add");
};

const onReset = () => {
  ElMessage({
    type: "success",
    message: "重置成功"
  });
  emit("reset");
};

const onSearch = () => {
  emit("search");
};
</script>

<template>
  <div class="query-box">
    <div class="default-show-box">
      <slot name="show" />
      <template v-if="!props.isEmpty">
        <div class="show-operation-box">
          <div
            v-if="props.hasMore"
            class="senior-search-btn"
            :class="state.moreVisible ? 'active' : ''"
            @click="state.moreVisible = !state.moreVisible"
          >
            {{ searchMoreName }}
            <div class="icon">
              <IconifyIconOffline icon="arrow-down" />
            </div>
          </div>
          <div
            class="senior-operate-btn"
            :class="!props.hasMore ? 'button-offset' : ''"
          >
            <el-button
              v-if="hasSearch"
              class="search-btn"
              type="primary"
              @click="onSearch"
              >查 询</el-button
            >
            <el-button
              v-if="hasReset"
              class="reset-btn"
              type="warning"
              @click="onReset"
              >重 置</el-button
            >
            <template>
              <el-button
                v-if="props.hasAdd"
                type="success"
                :disabled="addDisabled"
                class="add-btn"
                @click="onAdd"
                >{{ props.addName }}</el-button
              >
            </template>
          </div>
        </div>
      </template>
    </div>
    <div v-show="state.moreVisible" class="default-hide-box">
      <div class="hide-operate-box">
        <slot name="hide" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.query-box {
  padding: 12px 12px 0;
  background: var(--el-bg-color);
  min-height: 42px;
  margin-bottom: 16px;

  .default-show-box {
    display: flex;
    flex-wrap: wrap;

    .show-operation-box {
      display: flex;
      width: 33.2%;
      margin-left: auto;
      margin-bottom: 10px;

      .senior-search-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 32px;
        font-size: 14px;
        color: #646a73;
        line-height: 32px;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
        margin-right: 8px;
        padding: 4px 0;
        cursor: pointer;
        user-select: none;

        i {
          color: #1f2329;
        }

        &.active {
          background: #eaebf0;
          position: relative;
          color: #3370ff;

          i {
            transform: rotate(180deg);
          }

          &::after {
            content: "";
            position: absolute;
            bottom: -12px;
            left: -1px;
            width: 100px;
            height: 14px;
            background: #eaebf0;
            z-index: 2;
            border-left: 1px solid #d9d9d9;
            border-right: 1px solid #d9d9d9;
          }
        }
      }

      .senior-operate-btn {
        display: flex;
        flex: 1;
        padding-right: 10%;
        max-width: 460px;

        .add-btn-wrap {
          display: inline-block;
          margin-left: 16px;
        }

        .search-btn {
          background: #3370ff;
          border: 1px solid #3370ff;
          min-width: 74px;
          border-radius: 0;

          &:hover {
            background-color: #6693ff;
            border-color: #6693ff;
          }
        }

        .reset-btn {
          background: #f39700;
          border: 1px solid #f39700;
          min-width: 74px;
          border-radius: 0;

          &:hover {
            background-color: #f39600cc;
            border-color: #f39600cc;
          }
        }

        .add-btn {
          background: #1aa259;
          border: 1px solid #1aa259;
          min-width: 74px;
          border-radius: 0;

          &:hover {
            background-color: #1aa259e5;
            border-color: #1aa259e5;
          }
        }

        .button-offset {
          padding-left: 100px;
        }
      }
    }
  }

  .default-hide-box {
    padding-bottom: 10px;

    .hide-operate-box {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      background: #eaebf0;
      border: 1px solid #d0d6df;
    }
  }
}
</style>
