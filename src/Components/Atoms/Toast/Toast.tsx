import React from "react";

import RNToast, { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => <BaseToast {...props} text1NumberOfLines={2} text2NumberOfLines={2} />,
  error: (props: any) => <ErrorToast {...props} text1NumberOfLines={2} text2NumberOfLines={2} />,
  info: (props: any) => <InfoToast {...props} text1NumberOfLines={2} text2NumberOfLines={2} />,
};

const Toast = () => {
  return <RNToast config={toastConfig} />;
};

export default Toast;
