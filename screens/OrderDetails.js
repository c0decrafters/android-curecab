import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../assets/colors";
import * as Icons from "react-native-vector-icons";
import dayjs from "dayjs";
import axios from "axios";
import { url } from "../lib/axios";
import { updateOrdersData } from "../redux/features/OrderSlice";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

const all = {
  delivered: { bg: "#FCF4C7", color: "#854E23" },
  pending: { bg: "#C8F7DF", color: "#559982" },
  failed: { bg: "#F8EAE9", color: "#752E32" },
};

const getBg = (status) => {
  if (status === "on-transit") return "#1593EE";
  return "#efefef";
};

const getColor = (status) => {
  if (status === "pending") return all.delivered.color;
  if (status === "on-transit") return "blue";
  if (status === "cancelled") return all.failed.color;
  return all.pending.color;
};

const getText = (status, delivered) => {
  if (delivered === true) return "YES";
  if (status === "cancelled") return "NO";
  if (status === "pending") return "-";
  if (status === "on-transit") return "Confirm";
};

const OrderDetails = ({ route, navigation }) => {
  const { order } = route.params;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(url + "/orders/update/" + order._id, {
        delivered: true,
        status: "delivered",
      });
      dispatch(updateOrdersData(order.orderId));
      setLoading(false);
      setVisible((prev) => !prev);
      Toast.show({
        type: "success",
        text1: "Success",
        text2:
          "Your order has been completely delivered. Thank you for choosing us.",
      });
      return navigation.goBack();
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
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: getColor(order.status) }]}>
          {order.orderId}
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Icons.Feather name="x" size={30} color={colors.lblack} />
        </Pressable>
      </View>
      <Text
        style={{
          fontSize: 20,
          margin: 5,
          color: colors.lblack,
          fontFamily: "Bold",
        }}
      >
        Order Details
      </Text>

      <View style={styles.dataView}>
        <View style={styles.view}>
          <Text style={styles.label}>Order Id</Text>
          <Text style={styles.result}>{order.orderId}</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Delivery Fee</Text>
          <Text
            style={[styles.result, { color: "#559982", fontFamily: "Bold" }]}
          >
            Ksh {order.delivery_fee}
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Span</Text>
          <Text style={styles.result}>{order.span} days</Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.result}>
            {dayjs(order.orderDate).format("DD/MM/YYYY")}
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Delivery Date</Text>
          <Text style={styles.result}>
            {dayjs(order.deliveryDate).format("DD/MM/YYYY")}
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.result, { color: getColor(order.status) }]}>
            {order.status}
          </Text>
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Delivered</Text>
          <Pressable
            onPress={() => setVisible((prev) => !prev)}
            disabled={
              order.status === "delivered" || order.status === "pending"
            }
            style={[styles.button2, { backgroundColor: getBg(order.status) }]}
          >
            <Text
              style={[
                styles.result,
                {
                  color: order.status !== "on-transit" ? colors.black : "white",
                },
              ]}
            >
              {getText(order.status, order.delivered)}
            </Text>
          </Pressable>
        </View>
      </View>

      <Modal transparent visible={visible}>
        <View style={styles.modalView}>
          <View style={styles.form}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{ fontFamily: "Bold", fontSize: 20, marginBottom: 5 }}
              >
                Confirm delivery
              </Text>
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Do you want to confirm the delivery of this order?
              </Text>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.action, { backgroundColor: colors.red }]}
                disabled={loading}
                onPress={() => setVisible((prev) => !prev)}
              >
                <Text style={styles.actionText}>NO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.action, { backgroundColor: colors.green }]}
                disabled={loading}
                onPress={handleConfirm}
              >
                {loading ? (
                  <ActivityIndicator color="white" size={30} />
                ) : (
                  <Text style={styles.actionText}>CONFIRM</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.bcolor,
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 19,
    fontFamily: "Bold",
  },
  button: {
    position: "absolute",
    right: 15,
  },
  dataView: {
    margin: 5,
    borderColor: colors.bcolor,
    borderWidth: 0.5,
  },
  view: {
    padding: 5,
    paddingHorizontal: 10,
    borderBottomColor: colors.bcolor,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "Bold",
  },
  result: {
    fontSize: 14,
    fontFamily: "Regular",
    color: colors.lblack,
  },
  button2: {
    width: 100,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000039",
  },
  form: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  action: {
    flex: 1,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  actionText: {
    fontFamily: "Bold",
    color: "white",
    fontSize: 16,
  },
});
