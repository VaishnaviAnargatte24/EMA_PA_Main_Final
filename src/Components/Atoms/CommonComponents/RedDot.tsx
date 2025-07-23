import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
export const RedDot = () => (
  <View
    style={{
      position: "absolute",
      top: -1,
      right: -1,
      width: scale(4),
      height: scale(4),
      borderRadius: scale(4),
      backgroundColor: "#DC2626",
    }}
  />
);
