import { View } from "react-native";
import React, { ReactNode } from "react";
import { scale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
interface PageWrapperProps {
  children: ReactNode;
}
const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
export default PageWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(12),
    backgroundColor: "#ffffff",
  },
});
