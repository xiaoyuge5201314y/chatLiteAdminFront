import { deepClone } from '/@/utils/common'

export const useList = function (listApi, listQuery: object) {
  const initListQuery = deepClone(listQuery)
  const state = reactive({
    total: 0,
    list: [],
    pageQuery: {
      current: 1,
      size: 20,
    },
  })
  const params = computed(() => ({
    ...listQuery,
    ...state.pageQuery,
  }))

  async function getList() {
    const res = await listApi(unref(params))
    state.total = res.data?.total || res.total || 0
    state.list = res.data || res.data.records || []
  }

  async function onSearch() {
    state.pageQuery.current = 1
    await getList()
  }

  function currentChange(current: number) {
    state.pageQuery.current = current
    getList()
  }

  function sizeChange(size: number) {
    state.pageQuery.size = size
    getList()
  }

  function onReset() {
    state.pageQuery.current = 1
    state.pageQuery.current = 20
    Object.assign(listQuery, initListQuery)
  }

  return {
    ...toRefs(state),

    onSearch,
    onReset,
    currentChange,
    sizeChange,
  }
}
