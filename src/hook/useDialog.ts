import { reactive } from "vue";

export function useDialog() {
  const dialog = reactive({
    row: {},
    id: null
  });
  function openDialog(key: string): void;
  function openDialog(key: string, id: string): void;
  function openDialog(key: string, row: object): void;
  function openDialog(key: string, idOrRow?: string | object) {
    dialog[key] = true;
    if (idOrRow) {
      if (typeof idOrRow === "string") {
        dialog.id = idOrRow;
      } else {
        Object.assign(dialog.row, idOrRow);
      }
    }
  }

  function closeDialog(key: string) {
    dialog[key] = false;
  }

  function clearDialog() {
    for (const key in dialog) {
      if (dialog[key] === true) {
        dialog[key] = false;
      }
    }
  }

  return {
    dialog,
    openDialog,
    closeDialog,
    clearDialog
  };
}
