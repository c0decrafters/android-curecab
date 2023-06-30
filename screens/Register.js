import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import * as Icons from "react-native-vector-icons";
import Toast from "react-native-toast-message";
import { colors } from "../assets/colors";
import { useState } from "react";
import PhoneInput from "react-phone-number-input/react-native-input";
import { url } from "../lib/axios";
import axios from "axios";
import { generateAvatar } from "../lib/avatar";

function Register({ navigation }) {
  const [phone, setPhone] = useState("");
  const [ccc_no, setCcc_no] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [idModal, setIdModal] = useState(false);
  const [id, setId] = useState(null);

  const handleRegister = async () => {
    if (!phone || !ccc_no || !password || !cpassword)
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

    if (password !== cpassword)
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords don't match.",
      });

    setLoading(true);
    try {
      const { data } = await axios.post(url + "/patients/validate", { ccc_no });
      setFoundUser(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.msg,
      });
    }
  };

  const handleAccept = async () => {
    if (!id)
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Provide an ID number.",
      });
    setLoading(true);

    try {
      const { data } = await axios.post(url + "/patients/register", {
        full_name: foundUser.full_name,
        facility: foundUser.facility,
        id_no: foundUser.id_no,
        phone,
        ccc_no,
        password,
        photoUrl: generateAvatar(foundUser.full_name),
      });

      setLoading(false);
      setFoundUser(null);
      setIdModal(false);
      navigation.navigate("Login");
      return Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your registration was successfull. Continue to login.",
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

  const handleReject = (e) => {
    e.preventDefault();
    setFoundUser(null);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.screen}
    >
      <KeyboardAvoidingView>
        <Pressable onPress={() => navigation.goBack()}>
          <Icons.MaterialCommunityIcons
            color={colors.black}
            name="arrow-left-top"
            size={30}
          />
        </Pressable>
        <View style={styles.header}>
          <Text style={{ fontFamily: "Bold", fontSize: 20 }}>
            Sign up to continue
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
          <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
            CCC_no number
          </Text>
          <TextInput
            value={ccc_no}
            onChangeText={(value) => setCcc_no(value.trim())}
            style={styles.input}
            placeholder="Enter your ccc_no number"
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: "Bold", fontSize: 16 }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value.trim())}
            style={styles.input}
            placeholder="password"
            secureTextEntry
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
            Confirm Password
          </Text>
          <TextInput
            value={cpassword}
            onChangeText={(value) => setCpassword(value.trim())}
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          activeOpacity={0.85}
          style={styles.button}
        >
          {!foundUser && loading ? (
            <ActivityIndicator color={colors.white} size={30} />
          ) : (
            <Text style={{ fontFamily: "Bold", fontSize: 18, color: "white" }}>
              Register
            </Text>
          )}
        </TouchableOpacity>

        <Modal transparent visible={foundUser !== null}>
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <Text style={styles.prompt}>
                Is your name{" "}
                <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
                  {foundUser?.full_name.split(" ")[0]}...
                </Text>{" "}
                with CCC_no number{" "}
                <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
                  {foundUser?.ccc_no}
                </Text>
              </Text>

              <View style={styles.buttons}>
                <Pressable
                  onPress={handleReject}
                  style={[styles.modalBtn, { backgroundColor: colors.red }]}
                >
                  <Text
                    style={{ fontSize: 20, fontFamily: "Bold", color: "white" }}
                  >
                    NO
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setIdModal(true)}
                  style={[styles.modalBtn, { backgroundColor: colors.green }]}
                >
                  <Text
                    style={{ fontSize: 20, fontFamily: "Bold", color: "white" }}
                  >
                    {foundUser && loading ? (
                      <ActivityIndicator color={colors.white} size={30} />
                    ) : (
                      <Text
                        style={{
                          fontFamily: "Bold",
                          fontSize: 18,
                          color: "white",
                        }}
                      >
                        YES
                      </Text>
                    )}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent visible={idModal}>
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  fontFamily: "Regular",
                }}
              >
                Enter your ID number asscociated with this CCC number.
              </Text>
              <TextInput
                value={id}
                onChangeText={(value) => setId(value.trim())}
                style={styles.input}
                placeholder="12345678"
                disabled={foundUser && loading}
              />

              <View style={styles.buttons}>
                <Pressable
                  disabled={foundUser && loading}
                  onPress={() => setIdModal(false)}
                  style={[styles.modalBtn, { backgroundColor: colors.red }]}
                >
                  <Text
                    style={{ fontSize: 20, fontFamily: "Bold", color: "white" }}
                  >
                    CANCEL
                  </Text>
                </Pressable>
                <Pressable
                  disabled={foundUser && loading}
                  onPress={handleAccept}
                  style={[styles.modalBtn, { backgroundColor: colors.green }]}
                >
                  <Text
                    style={{ fontSize: 20, fontFamily: "Bold", color: "white" }}
                  >
                    {foundUser && loading ? (
                      <ActivityIndicator color={colors.white} size={30} />
                    ) : (
                      <Text
                        style={{
                          fontFamily: "Bold",
                          fontSize: 18,
                          color: "white",
                        }}
                      >
                        SUBMIT
                      </Text>
                    )}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Register;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "column",
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
  },
  button: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
    height: 50,
  },
  modalBtn: {
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 15,
  },
  prompt: {
    fontSize: 16,
    fontFamily: "Regular",
    textAlign: "center",
    color: colors.lblack,
  },
  modal: {
    flex: 1,
    backgroundColor: "#00000019",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    padding: 10,
  },
});
