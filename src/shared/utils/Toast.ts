import Toast from "react-native-toast-message";

export const ToastMessage = {
  info: (description: string, title = "Information") =>
    Toast.show({
      type: "info",
      text1: title,
      text2: description,
      props: {
        text1NumberOfLines: 2,
        text2NumberOfLines: 2,
      },
    }),
  success: (description: string, title = "Success") =>
    Toast.show({
      type: "success",
      text1: title,
      text2: description,
      props: {
        text1NumberOfLines: 2,
        text2NumberOfLines: 2,
      },
    }),
  error: (description: string, title = "Error") =>
    Toast.show({
      type: "error",
      text1: title,
      text2: description,
      props: {
        text1NumberOfLines: 2,
        text2NumberOfLines: 2,
      },
    }),
  hide: () => Toast.hide(),
};
