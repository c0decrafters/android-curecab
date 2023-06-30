import { View, Text, StyleSheet } from "react-native";
import { memo } from "react";
import { colors } from "../assets/colors";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text
        style={{
          fontFamily: "Bold",
          fontSize: 28,
          color: colors.red,
        }}
      >
        CURECAB
      </Text>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    padding: 15,
    elevation: 10,
  },
});
