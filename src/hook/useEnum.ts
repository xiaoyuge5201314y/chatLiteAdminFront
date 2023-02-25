import { reactive } from 'vue';
// import { common_enum } from '../api/common';

// 用户权限等级
const USER_LEVEL = [
  { code: 1, label: '会员' },
  { code: 2, label: 'Vip' },
  { code: 3, label: 'SVip' },
  { code: 4, label: '管理员' },
  { code: 5, label: '超级管理员' },
];

export function useEnum() {
  const enumMap = reactive({});
  enumMap['USER_LEVEL'] = USER_LEVEL;
  async function initEnum() {
    // const res: any = await common_enum();
    // Object.assign(enumMap, res.data);
  }

  return {
    enumMap,
    initEnum,
  };
}
