import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { colors } from "../assets/colors";

const DropDown = ({ data, onPress, setValue }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data?.map((item, i) => {
          const isSelected = item === selected;
          return (
            <Pressable
              onPress={() => {
                onPress(), setSelected(item), setValue(item);
              }}
              key={i}
              style={[
                styles,
                { backgroundColor: isSelected ? colors.input : "white" },
              ]}
            >
              <Text style={styles.text}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000039",
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    height: undefined,
    maxHeight: 250,
    borderRadius: 2,
    paddingHorizontal: 8,
    backgroundColor: "white",
    paddingHorizontal: 10,
    padding: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: "Regular",
    color: colors.black,
  },
  button: {
    padding: 10,
    marginBottom: 5,
    borderColor: colors.bcolor,
    borderWidth: 0.8,
  },
});
