import { View, ScrollView, StyleSheet } from "react-native";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Choose from "../components/Choose";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { colors } from "../assets/colors";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection navigation={navigation} />

        <About />

        <Services />

        <Choose />

        <Footer navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
