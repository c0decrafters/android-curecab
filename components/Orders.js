import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { colors } from "../assets/colors";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const Orders = ({ loading }) => {
  const { orders } = useSelector((store) => store.orders);
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: "Bold", marginBottom: 10, fontSize: 20 }}>
        Order history
      </Text>
      {loading ? (
        <ActivityIndicator
          size={40}
          color={colors.red}
          style={{ alignSelf: "center" }}
        />
      ) : (
        <ScrollView>
          {orders?.map((order) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderDetails", { order })}
              key={order.orderId}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                padding: 10,
                borderColor: colors.bcolor,
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  color: colors.lblack,
                  fontSize: 13,
                }}
              >
                {dayjs(order.orderDate).format("DD/MM/YYYY")}
              </Text>
              <StatusComp status={order.status} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Orders;

// const DateComp = (date) => {
//   console.log("date");

//   return (
//     <Text
//       style={{
//         textAlign: "center",
//         fontFamily: "Regular",
//         color: colors.lblack,
//         fontSize: 13,
//       }}
//     >
//       {dayjs(date).format("DD/MM/YYYY")}
//     </Text>
//   );
// };

// const OrderIdComp = (orderId) => {
//   console.log("id");

//   return (
//     <Text
//       style={{
//         textAlign: "center",
//         fontFamily: "Regular",
//         color: colors.lblack,
//         fontSize: 13,
//       }}
//     >
//       {orderId}
//     </Text>
//   );
// };

// const PriceComp = (price) => {
//   console.log("price");

//   return (
//     <Text
//       style={{
//         textAlign: "center",
//         fontFamily: "Regular",
//         color: colors.lblack,
//         fontSize: 13,
//       }}
//     >
//       Ksh <Text style={{ fontFamily: "Bold" }}>{price}</Text>
//     </Text>
//   );
// };

const StatusComp = ({ status }) => {
  const all = {
    delivered: { bg: "#FCF4C7", color: "#854E23" },
    pending: { bg: "#C8F7DF", color: "#559982" },
    failed: { bg: "#F8EAE9", color: "#752E32" },
  };

  const getBg = (status) => {
    if (status === "pending") return all.pending.bg;
    if (status === "on-transit") return "#1593EE";
    if (status === "cancelled") return all.failed.bg;
    return all.delivered.bg;
  };

  const getColor = (status) => {
    if (status === "pending") return all.delivered.color;
    if (status === "on-transit") return "blue";
    if (status === "cancelled") return all.failed.color;
    return all.pending.color;
  };
  return (
    <Text
      style={{
        textAlign: "center",
        fontFamily: "Regular",
        color: getColor(status),
        borderRadius: 20,
        marginHorizontal: 10,
        paddingVertical: 5,
        fontSize: 12,
      }}
    >
      {status}
    </Text>
  );
};

// const DeliveredComp = (delivered, status, order) => {
//   const getText = () => {
//     if (status === "cancelled") return "NO";
//     if (delivered) return "YES";
//     if (status === "on-transit") return "CONFIRM";
//     return "-";
//   };

//   const getColor = () => {
//     if (status === "on-transit") return "white";
//     if (status === "delivered") return colors.green;
//     return "black";
//   };

//   const getBg = () => {
//     if (status === "on-transit") return colors.red;
//     return "white";
//   };

//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const { selectedOrder, orderModalOpen } = useSelector(
//     (store) => store.orders
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       dispatch(updateOrdersData(selectedOrder.orderId));
//       dispatch(setSelectedOrder(null));
//       dispatch(toggleOrder());
//       Toast.show({
//         type: "success",
//         text1: "Success",
//         text2: "Order delivery completed. Thank you for choosing us.",
//       });
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => {
//           dispatch(toggleOrder());
//           dispatch(setSelectedOrder(order));
//         }}
//         activeOpacity={0.8}
//         disabled={delivered || status === "cancelled" || status === "pending"}
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 3,
//         }}
//       >
//         <Text
//           style={{
//             fontFamily: "Bold",
//             backgroundColor: getBg(),
//             color: getColor(),
//             fontSize: 12,
//             width: "100%",
//             textAlign: "center",
//             paddingVertical: 10,
//           }}
//         >
//           {getText()}
//         </Text>
//       </TouchableOpacity>
//       <Modal visible={orderModalOpen} transparent>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#00000009",
//           }}
//         >
//           <View
//             style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
//           >
//             <Text
//               style={{ fontSize: 14, fontFamily: "Bold", textAlign: "center" }}
//             >
//               Confirm the delivery of a request with order Id{" "}
//               {selectedOrder?.orderId} made on{" "}
//               {dayjs(selectedOrder?.orderDate).format("DD/MM/YYYY HH:mm")}
//             </Text>
//             <View
//               style={{
//                 gap: 5,
//                 alignItems: "center",
//                 flexDirection: "row",
//                 marginTop: 15,
//               }}
//             >
//               <TouchableOpacity
//                 disabled={loading}
//                 activeOpacity={0.6}
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 45,
//                   backgroundColor: colors.red,
//                 }}
//                 onPress={() => {
//                   dispatch(setSelectedOrder(null));
//                   dispatch(toggleOrder());
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontFamily: "Bold",
//                     color: "white",
//                     fontSize: 16,
//                     borderRadius: 5,
//                   }}
//                 >
//                   Cancel
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 disabled={loading}
//                 activeOpacity={0.6}
//                 style={{
//                   flex: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 45,
//                   backgroundColor: colors.green,
//                 }}
//                 onPress={handleSubmit}
//               >
//                 {loading ? (
//                   <ActivityIndicator color="white" size={30} />
//                 ) : (
//                   <Text
//                     style={{
//                       fontFamily: "Bold",
//                       color: "white",
//                       fontSize: 16,
//                       borderRadius: 5,
//                     }}
//                   >
//                     Confirm
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

const styles = StyleSheet.create({
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.bcolor,
  },
  text: {
    textAlign: "center",
    fontFamily: "Regular",
    backgroundColor: "white",
  },
});
