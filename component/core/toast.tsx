import Toast from "react-native-toast-message";
export function showLoading() {
  Toast.show({
    type: "loading",
    position: "bottom",
    autoHide: false,
    text1: "Loading...",
  });
}
export function hidToast() {
  Toast.hide();
}

export function showInfo(text: string) {
  Toast.hide();
  Toast.show({
    type: "info",
    position: "bottom",
    autoHide: false,
    text1: text,
  });
}
export function showError(text: string) {
  // Toast.hide();
  Toast.show({
    type: "error",
    position: "bottom",
    autoHide: false,
    text1: text,
  });
}
export function showSuccess(text: string) {
  Toast.hide();
  Toast.show({
    type: "success",
    position: "bottom",
    autoHide: false,
    text1: text,
  });
}
