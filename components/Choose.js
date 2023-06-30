import { View, Text } from "react-native";
import * as Icons from "react-native-vector-icons";
import { colors } from "../assets/colors";
import { memo } from "react";

const Choose = () => {
  const reasons = [
    {
      title: "Confidentiality",
      desc: "Patients personal data is well handled throughout the delivery process without outsiders getting involved.",
    },
    {
      title: "Convenience",
      desc: "Patients can order their drugs from the comfort of their homes, without having to visit the clinic.",
    },
    {
      title: "Ease of Access",
      desc: "Patients can access our services through our website, mobile app and USSD.",
    },
    {
      title: "Fast delivery",
      desc: "Patients can receive their drugs in a timely manner, without having to wait in long queues at clinics.",
    },
  ];
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 60,
      }}
    >
      <Text style={{ fontFamily: "Bold", textAlign: "center", fontSize: 25 }}>
        ~ Why choose us ~
      </Text>
      {reasons.map((reason) => (
        <View
          key={reason.title}
          style={{ flexDirection: "row", paddingRight: 10, marginTop: 15 }}
        >
          <Icons.Ionicons
            name="ios-checkmark-circle"
            size={30}
            color={colors.red}
          />
          <View style={{ marginLeft: 10, paddingRight: 15 }}>
            <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
              {reason.title}
            </Text>
            <Text style={{ fontFamily: "Regular", color: colors.lblack }}>
              {reason.desc}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default memo(Choose);
