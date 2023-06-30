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
import PhoneInput from "react-phone-number-input/react-native-input";
import { colors } from "../assets/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/AuthSlice";
import axios from "axios";
import { url } from "../lib/axios";

function Login({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!phone || !password)
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields are required.",
      });

    if (password.length < 6)
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password must be 6 or more characters.",
      });

    setLoading(true);
    try {
      const { data } = await axios.post(url + "/patients/login", {
        phone,
        password,
      });
      setLoading(false);
      dispatch(setUser(data.user));
      return Toast.show({
        type: "success",
        text1: "Success",
        text2: data.msg,
      });
    } catch (error) {
      setLoading(false);
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.msg,
      });
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screen}
    >
      <Pressable
        style={{ position: "absolute", left: 10, top: 10, zIndex: 23 }}
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Icons.MaterialCommunityIcons
          color={colors.black}
          name="arrow-left-top"
          size={30}
        />
      </Pressable>
      <View style={styles.header}>
        <Text style={{ fontFamily: "Bold", fontSize: 20 }}>
          Sign in to continue
        </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "Bold", fontSize: 16 }}>Phone number</Text>
        <PhoneInput
          disabled={loading}
          style={styles.input}
          defaultCountry="KE"
          value={phone}
          onChange={(value) => setPhone(value)}
          placeholder="0712345678"
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "Bold", fontSize: 16 }}>Password</Text>
        <TextInput
          disabled={loading}
          value={password}
          onChangeText={(value) => setPassword(value.trim())}
          style={styles.input}
          placeholder="password"
          secureTextEntry
        />
      </View>

      <Text
        style={{
          marginHorizontal: "auto",
          fontFamily: "Regular",
          fontSize: 16,
          marginTop: 15,
          marginLeft: "auto",
          color: colors.red,
        }}
        onPress={() => navigation.navigate("Forgot")}
      >
        Forgot password?
      </Text>

      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.85}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} size={30} />
        ) : (
          <Text style={{ fontFamily: "Bold", fontSize: 18, color: "white" }}>
            Login
          </Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            marginHorizontal: "auto",
            fontFamily: "Regular",
            fontSize: 16,
          }}
        >
          Don't have an account?{" "}
          <Text
            style={{ color: colors.red }}
            onPress={() => navigation.navigate("Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "center",
  },
  input: {
    fontFamily: "Regular",
    backgroundColor: colors.input,
    padding: 10,
    color: colors.lblack,
    marginTop: 5,
    letterSpacing: 2,
  },
  button: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
    height: 50,
  },
});
