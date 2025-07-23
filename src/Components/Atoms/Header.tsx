import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // <-- Import hook
import { scale } from "react-native-size-matters";

import JammigoIcon from "../../assets/icons/Jammigo.svg";
import NotificationIcon from "../../assets/icons/Notification_outlinned.svg";
import { ROUTES } from "../../Routes";

const Header = () => {
  const navigation = useNavigation(); // <-- Get navigation object

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
      <JammigoIcon width={scale(70)} height={scale(25)} />
      <NotificationIcon onPress={() => navigation.navigate(ROUTES.Notifications)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scale(44),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: scale(16),
    paddingLeft: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#C8CDFD",
    backgroundColor: "#F5F5F5",
  },
});

export default Header;
