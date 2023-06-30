import "react-native-gesture-handler";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./Navigation";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import ToastContainer from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "./redux/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/Prompt-Regular.ttf"),
    Bold: require("./assets/fonts/Prompt-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <Navigation />
      </Provider>
      <ToastContainer />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
