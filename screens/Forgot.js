import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import * as Icons from "react-native-vector-icons";
import Toast from "react-native-toast-message";
import { colors } from "../assets/colors";
import { useState } from "react";
import { patients } from "../data";

function Forgot({ navigation }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!phone)
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields are required.",
      });

    setLoading(true);
    setTimeout(() => {
      const user = patients.find((p) => p.phone === phone);
      if (!user) {
        setLoading(false);
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid credentials.",
        });
      }

      setLoading(false);

      return Toast.show({
        type: "success",
        text1: "Success",
        text2: "A password reset link has been sent to your phone number.",
      });
    }, 1000);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screen}
    >
      <Pressable
        style={{ position: "absolute", left: 10, top: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Icons.MaterialCommunityIcons
          color={colors.black}
          name="arrow-left-top"
          size={30}
        />
      </Pressable>
      <View style={styles.header}>
        <Text style={{ fontFamily: "Bold", fontSize: 20 }}>
          Forgot your password?
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: 17,
            textAlign: "center",
            marginHorizontal: 10,
            color: colors.lblack,
          }}
        >
          Don't stress out. We'll help you recover it.
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "Bold", fontSize: 16 }}>Phone number</Text>
        <TextInput
          value={phone}
          onChangeText={(value) => setPhone(value.trim())}
          style={styles.input}
          placeholder="+254 * * * * * * *"
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.85}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} size={30} />
        ) : (
          <Text style={{ fontFamily: "Bold", fontSize: 18, color: "white" }}>
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Forgot;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    fontFamily: "Regular",
    backgroundColor: colors.input,
    padding: 10,
    color: colors.lblack,
    marginTop: 5,
  },
  button: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
    height: 50,
  },
});
