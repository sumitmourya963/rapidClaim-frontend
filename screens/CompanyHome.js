import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import openBox from "../assets/open_box.png";
import person from "../assets/person.png";
import gear from "../assets/gear.png";
import store from "../assets/store.png";

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

const CompanyHome = ({ navigation }) => {
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const buttonRef3 = useRef(null);
  const buttonRef4 = useRef(null);

  useEffect(() => {
    const dealerTimeoutId = setTimeout(() => {
      if (buttonRef1.current) {
        buttonRef1.current.fadeIn(1000);
      }
    }, 1000);
    const productTimeoutId = setTimeout(() => {
      if (buttonRef2.current) {
        buttonRef2.current.fadeIn(1000);
      }
    }, 1000);
    const profileTimeoutId = setTimeout(() => {
      if (buttonRef3.current) {
        buttonRef3.current.fadeIn(1000);
      }
    }, 1000);
    const settingTimeoutId = setTimeout(() => {
      if (buttonRef4.current) {
        buttonRef4.current.fadeIn(1000);
      }
    }, 1000);
    return () => {
      clearTimeout(dealerTimeoutId);
      clearTimeout(productTimeoutId);
      clearTimeout(profileTimeoutId);
      clearTimeout(settingTimeoutId);
    };
  }, []);

  const handleAddDealer = () => {
    navigation.navigate("AddDealer");
  };

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <AnimatedButton
          animation="fadeIn"
          style={styles.button1}
          ref={buttonRef1}
          onPress={handleAddDealer}
        >
          <Text style={styles.buttonText}>Dealers</Text>
          <Image source={store} style={styles.image} resizeMode="cover" />
        </AnimatedButton>
        <AnimatedButton
          animation="fadeIn"
          style={styles.button2}
          ref={buttonRef2}
          onPress={handleAddDealer}
        >
          <Text style={styles.buttonText}>Products</Text>
          <Image source={openBox} style={styles.image} resizeMode="cover" />
        </AnimatedButton>
      </View>
      <View style={styles.container2}>
        <AnimatedButton
          animation="fadeIn"
          style={styles.button3}
          ref={buttonRef3}
          onPress={handleAddDealer}
        >
          <Text style={styles.buttonText}>Profile</Text>
          <Image source={person} style={styles.image} resizeMode="cover" />
        </AnimatedButton>
        <AnimatedButton
          animation="fadeIn"
          style={styles.button4}
          ref={buttonRef4}
          onPress={handleAddDealer}
        >
          <Text style={styles.buttonText}>setting</Text>
          <Image source={gear} style={styles.image} resizeMode="cover" />
        </AnimatedButton>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bottomContainer1}
          onPress={handleAddProduct}
        >
          <View style={styles.icon1}>
            <Image source={openBox} style={styles.image} resizeMode="cover" />
          </View>
          <View style={styles.textView1}>
            <Text style={styles.addDealer}>Add Product</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomContainer2}
          onPress={handleAddDealer}
        >
          <View style={styles.icon2}>
            <Image source={person} style={styles.image} resizeMode="cover" />
          </View>
          <View style={styles.textView2}>
            <Text style={styles.addDealer}>Add Dealer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    height: "23%",
    width: "100%",
    justifyContent: "space-evenly",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    height: "23%",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button1: {
    backgroundColor: "#65B741",

    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: "45%",
    height: "95%",
    alignItems: "center",
    elevation: 10,
  },
  button2: {
    backgroundColor: "#BE3144",

    padding: 15,
    marginVertical: 10,
    width: "45%",
    height: "95%",
    alignItems: "center",
    elevation: 10,
    borderRadius: 20,
  },
  button3: {
    backgroundColor: "orange",

    padding: 15,
    marginVertical: 10,
    width: "45%",
    height: "95%",
    alignItems: "center",
    elevation: 10,
    borderRadius: 20,
  },
  button4: {
    backgroundColor: "#4CB9E7",

    padding: 15,
    marginVertical: 10,
    width: "45%",
    height: "95%",
    alignItems: "center",
    elevation: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    height: "50%",
    width: "90%",
    elevation: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white",
    marginBottom: -30,
    marginTop: 50,
  },
  bottomContainer1: {
    height: "30%",
    width: "90%",
    margin: 30,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -20,
    marginTop: -30,
  },
  bottomContainer2: {
    height: "30%",
    width: "90%",
    margin: 30,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 50,
    height: 50,
  },
  icon1: {
    backgroundColor: "#BE3144",
    padding: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    elevation: 5,
  },
  icon2: {
    backgroundColor: "green",
    padding: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    elevation: 5,
  },
  addDealer: {
    fontSize: 20,
    marginLeft: -30,
    fontWeight: "bold",
    color: "grey",
  },
  textView1: {
    width: "78%",
    height: "63.5%",
    borderColor: "#BE3144",
    borderWidth: 2,
    marginLeft: -5,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 10,
  },
  textView2: {
    width: "78%",
    height: "63.5%",
    borderColor: "green",
    borderWidth: 2,
    marginLeft: -5,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 10,
  },
});

export default CompanyHome;
