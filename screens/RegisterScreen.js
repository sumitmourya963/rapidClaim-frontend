import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import rapidClaim from "../assets/rapidClaim.png";
function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gst, setGst] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [showRegistrationNotification, setShowRegistrationNotification] =
    useState(false);

  const handleRegister = async () => {
    try {
      const data = await axios.post(
        "http://192.168.137.92:4000/api/v1/register",
        {
          name,
          gst,
          phone,
          email,
          password,
        }
      );
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fadeInView();
  }, []);

  const fadeInView = () => {
    if (containerRef.current) {
      containerRef.current.fadeIn(1500);
    }
  };

  const containerRef = useRef();

  return (
    <View style={styles.container}>
      <Animatable.View
        ref={containerRef}
        style={styles.formContainer}
        animation="fadeIn"
        duration={1500}
        delay={500}
      >
        <Image source={rapidClaim} style={styles.image} resizeMode="cover" />
        <Text style={styles.headerText}>Rapid Claim</Text>
        <Text style={styles.sloganText}>
          Warranty Redefined: Simple, Central, Secure.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="GST"
          value={gst}
          onChangeText={(text) => setGst(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone No."
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            handleRegister();
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Login")}
        >
          Already a user? Login
        </Text>
      </Animatable.View>

      {/* Registration Notification Modal */}
      <Modal
        isVisible={showRegistrationNotification}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.7}
        onBackdropPress={() => setShowRegistrationNotification(false)}
        onModalHide={() => setShowRegistrationNotification(false)}
      >
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>
            Registration Successful! You can now log in.
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowRegistrationNotification(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: "#15a6d1",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginBtn: {
    color: "#15a6d1",
    marginLeft: 160,
    marginTop: 20,
  },

  notificationContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    marginTop: -100,
  },
  headerText: {
    fontSize: 25,
    color: "#15a6d1",

    marginBottom: 5,
    fontWeight: "bold",
  },
  sloganText: {
    fontSize: 14,
    color: "#15a6d1",
    marginBottom: 40,
  },
});

export default RegisterScreen;
