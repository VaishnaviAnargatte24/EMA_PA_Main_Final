import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { scale } from "react-native-size-matters";
import LeftArrow from "../../assets/icons/LeftArrow.svg";
import { useNavigation } from "@react-navigation/native";
import { HeaderTitleText } from "./AllText/Text";

interface ScreenHeaderProps {
  children: ReactNode;
  rightElement?: ReactNode;
  style?: ViewStyle;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ children, rightElement, style }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftArrow width={20} height={20} />
        </TouchableOpacity>
        <HeaderTitleText fw="500" style={styles.text}>
          {children}
        </HeaderTitleText>
      </View>
      {rightElement && <View>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: scale(10),
  },
  text: {
    color: "#404040",
    paddingLeft: scale(4),
  },
});

export default ScreenHeader;
