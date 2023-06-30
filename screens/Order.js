import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as Icons from "react-native-vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../assets/colors";
import dayjs from "dayjs";
import Toast from "react-native-toast-message";
import { generateOrderId, getUserNextOrderDate } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { updateOrders } from "../redux/features/OrderSlice";
import { setUser } from "../redux/features/AuthSlice";
import axios from "axios";
import { url } from "../lib/axios";
import SelectDropdown from "react-native-select-dropdown";

const Order = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [facilities, setFacilities] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [facility, setFacility] = useState("");
  const [courier, setCourier] = useState("");
  const [address, setAddress] = useState("");
  const [deliverBy, setDeliverBy] = useState(new Date());
  const [span, setSpan] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const unsub = navigation.addListener("focus", async () => {
      try {
        Toast.show({
          type: "info",
          text1: "Please wait...",
          text2: "Fetching facilities and couriers.",
        });

        const response = await Promise.all([
          axios.get(url + "/couriers"),
          axios.get(url + "/facilities"),
        ]);

        setCouriers(response[0].data.couriers);
        setFacilities(response[1].data.facilities);
        Toast.show({
          type: "success",
          text1: "Done",
          text2: "Continue to place your order.",
        });
      } catch (error) {
        console.log(error);
      }
    });

    return unsub;
  }, []);

  const onChangeTime = useCallback((time) => {
    setShow(false);
    setDeliverBy(time.nativeEvent.timestamp);
  }, []);

  const handleSubmit = async () => {
    if (!facility || !courier || !address || !deliverBy || !span) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "All input fields are required.",
      });
    }

    setLoading(true);
    try {
      const { data } = await axios.post(url + "/orders/make", {
        client: user.phone,
        orderId: generateOrderId(),
        address,
        courier,
        deliverBy,
        userId: user._id,
        span: parseInt(span),
        facility,
        photoUrl: user.photoUrl,
        next_order: getUserNextOrderDate(parseInt(span)),
      });

      setLoading(false);
      dispatch(updateOrders(data.order));
      dispatch(setUser(data.user));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: data.msg,
      });
      return navigation.navigate("Welcome");
    } catch (error) {
      console.log(error);
      setLoading(false);
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.msg,
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.bold}>Make an order.</Text>
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <Icons.Ionicons name="ios-arrow-back" size={25} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
        {/* select facility */}
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Clinic</Text>

          <SelectDropdown
            renderDropdownIcon={() => (
              <Icons.Feather
                name="chevron-down"
                size={30}
                color={colors.lblack}
              />
            )}
            defaultButtonText="- Select -"
            search={true}
            buttonStyle={{ width: "100%", color: colors.lblack }}
            buttonTextStyle={{
              fontFamily: "Regular",
              fontSize: 14,
            }}
            dropdownStyle={{
              borderRadius: 5,
              backgroundColor: "white",
            }}
            searchInputStyle={{
              backgroundColor: colors.input,
            }}
            searchInputTxtStyle={{
              fontFamily: "Regular",
              color: colors.lblack,
              fontSize: 14,
            }}
            searchPlaceHolder="Search..."
            disabled={facilities?.length === 0}
            data={facilities?.map((f) => f.name)}
            onSelect={(selectedItem) => {
              setFacility(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return (
                <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                  {selectedItem}
                </Text>
              );
            }}
            rowTextForSelection={(item) => {
              return (
                <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                  {item}
                </Text>
              );
            }}
          />
        </View>

        {/* courier select */}
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Preffered Courier</Text>

          <SelectDropdown
            renderDropdownIcon={() => (
              <Icons.Feather
                name="chevron-down"
                size={30}
                color={colors.lblack}
              />
            )}
            search={true}
            buttonStyle={{ width: "100%", color: colors.lblack }}
            buttonTextStyle={{
              fontFamily: "Regular",
              fontSize: 14,
            }}
            dropdownStyle={{
              borderRadius: 5,
              backgroundColor: "white",
            }}
            searchInputStyle={{
              backgroundColor: colors.input,
            }}
            searchInputTxtStyle={{
              fontFamily: "Regular",
              color: colors.lblack,
              fontSize: 14,
            }}
            searchPlaceHolder="Search..."
            disabled={couriers?.length === 0}
            defaultButtonText=" - Select -"
            data={couriers}
            onSelect={(selectedItem) => {
              setCourier(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return (
                <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                  {selectedItem}
                </Text>
              );
            }}
            rowTextForSelection={(item) => {
              return (
                <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                  {item}
                </Text>
              );
            }}
          />
        </View>

        {/* delivery address  */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 3 }}>Delivery Address</Text>
          <TextInput
            value={address}
            onChangeText={(value) => setAddress(value)}
            style={styles.input}
            placeholder="1234 Example"
          />
        </View>

        {/* delivery date  */}
        <View>
          <Text style={styles.label}>Delivered by</Text>
          <TouchableOpacity
            onPress={() => setShow(true)}
            activeOpacity={0.9}
            style={styles.calendar}
          >
            <Text style={styles.calendarText}>
              Change -- {dayjs(deliverBy).format("DD/MM/YYYY")} --
            </Text>
            <Icons.Entypo
              color={colors.lblack}
              name="chevron-small-down"
              size={25}
            />
          </TouchableOpacity>
        </View>

        {/* span  */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.label}>Prescription span (in days)</Text>
          <TextInput
            value={span}
            onChangeText={(value) => setSpan(value.trim())}
            style={styles.input}
            placeholder="Enter days"
          />
        </View>

        {/* Date picker */}
        {show ? (
          <DateTimePicker
            value={new Date(deliverBy)}
            onChange={(value) => onChangeTime(value)}
            minimumDate={new Date()}
          />
        ) : null}

        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.7}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} size={30} />
          ) : (
            <Text style={{ fontFamily: "Bold", fontSize: 18, color: "white" }}>
              Order
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Order;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.25,
    borderBottomColor: colors.input,
    padding: 18,
  },
  bold: {
    fontFamily: "Bold",
    fontSize: 20,
  },
  goBack: {
    position: "absolute",
    left: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 3,
    fontFamily: "Regular",
  },
  input: {
    fontFamily: "Regular",
    backgroundColor: colors.input,
    height: 45,
    paddingHorizontal: 5,
    fontSize: 14,
    color: colors.lblack,
  },
  calendar: {
    backgroundColor: colors.input,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 3,
    justifyContent: "space-between",
    marginTop: 1,
  },
  calendarText: {
    fontFamily: "Regular",
    color: colors.lblack,
    fontSize: 14,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: colors.red,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Bold",
    fontSize: 18,
    color: colors.white,
  },
});
