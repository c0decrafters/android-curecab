import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../assets/colors";


const FeedBack = () => {
  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={{ fontFamily: "Bold", fontSize: 20 }}>
        Leave a feedBack.
      </Text>
      <TextInput
        numberOfLines={5}
        placeholder="Write to us..."
        multiline={true}
        style={{
          textAlignVertical: "top",
          backgroundColor: colors.input,
          padding: 10,
          color: colors.lblack,
          marginTop: 5,
          fontFamily: "Regular",
        }}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={() => {}}
      >
        <Text style={{ fontFamily: "Bold", fontSize: 18, color: "white" }}>
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 15,
    width: 200,
    height: 50,
  },
});
