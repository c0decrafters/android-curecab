import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../assets/colors";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/features/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.nav}>
      <Text style={{ fontFamily: "Bold", fontSize: 25, color: colors.red }}>
        CURECAB
      </Text>
      <Pressable onPress={() => dispatch(signOut())} style={styles.button}>
        <Text
          style={{
            fontFamily: "Bold",
            paddingHorizontal: 20,
            color: colors.lblack,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    height: 40,
    borderColor: colors.red,
    borderWidth: 0.7,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
  },
});
