import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { memo } from "react";
import { colors } from "../assets/colors";

const HeroSection = ({ navigation }) => {
  const navigate = () => {
    Linking.openURL(
      "https://play.google.com/store/apps/details?id=com.mhealth.nishauri"
    ).catch((err) => Alert.alert("There was an error! Please try again."));
  };

  return (
    <View style={styles.screen}>
      <View>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: 35,
            marginRight: 15,
            marginBottom: 10,
          }}
        >
          Usi-<Text style={{ color: colors.red }}>tense</Text>!
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: 16,
            color: colors.lblack,
          }}
        >
          Take the hassle out of getting your ARV medications and have them
          delivered to you quickly and easily.
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Login")}
            style={[styles.button, { backgroundColor: colors.red }]}
          >
            <Text style={styles.buttonText}>Order now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={navigate}
            style={[styles.button, { backgroundColor: "#3F00FF" }]}
          >
            <Text style={styles.buttonText}>Book appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Image
          source={require("../assets/images/medicines.png")}
          style={{
            alignSelf: "center",
            marginTop: 50,
            height: 160,
            width: 160,
          }}
        />
      </View>
    </View>
  );
};

export default memo(HeroSection);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    padding: 15,
    height: 500,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  buttonText: {
    fontFamily: "Bold",
    fontSize: 14,
    color: "white",
  },
});
