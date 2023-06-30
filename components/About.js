import { View, Text, Image } from "react-native";
import { memo } from "react";

const About = () => {
  return (
    <View style={{ padding: 10, backgroundColor: "white" }}>
      <Text
        style={{
          fontFamily: "Bold",
          textAlign: "center",
          fontSize: 30,
        }}
      >
        ~ About us ~
      </Text>
      <Text
        style={{
          fontFamily: "Regular",
          marginHorizontal: 10,
          textAlign: "center",
          paddingVertical: 30,
        }}
      >
        We are dedicated in improving health care services by ensuring there is
        efficient and timely delivering of ARV drugs. We prioritize client's
        confidentiality and provide excellent customer services to address any
        questions and concerns.
      </Text>
      <Image
        source={require("../assets/images/route.gif")}
        style={{
          aspectRatio: 1,
          height: 200,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
    </View>
  );
};

export default memo(About);
