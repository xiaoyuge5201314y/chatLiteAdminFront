import { ElMessage, ElMessageBox } from 'element-plus';

export function useEdit() {
  function editClick(editApi, ...args) {
    ElMessageBox.confirm('是否继续执行该操作', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      let cb;
      if (args[args.length - 1] instanceof Function) {
        cb = args.pop();
      }
      await editApi(...args);
      if (cb) {
        cb();
      }
      ElMessage.success('操作成功');
    });
  }

  return {
    editClick,
  };
}
