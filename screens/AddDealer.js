import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import SuccessNotification from "./Notification/SuccessNotification";
import ErrorNotification from "./Notification/ErrorNotification";
import axios from "axios";
import Svg, { Path } from "react-native-svg";

const AnimatedTouchableOpacity =
  Animatable.createAnimatableComponent(TouchableOpacity);

const AddDealer = () => {
  const [name, setName] = useState("");
  const [gst, setGST] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(0);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = (message, value) => {
    setNotificationMessage(message);
    setNotificationVisible(value);
  };

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const handleFormSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://192.168.137.92:4000/api/v1/new-dealer",
        {
          name,
          gst,
          phone,
          email,
          location,
          address,
        }
      );
      console.log(data);
      showNotification("Dealer Created Successfully.", 1);
    } catch (error) {
      console.log(error);
      showNotification("Some Error Occured", 2);
    }
  };

  return (
    <View style={styles.container}>
      {notificationVisible == 1 ? (
        <SuccessNotification
          message={notificationMessage}
          onClose={hideNotification}
        />
      ) : notificationVisible == 2 ? (
        <ErrorNotification
          message={notificationMessage}
          onClose={hideNotification}
        />
      ) : (
        ""
      )}
      <View style={styles.top}>
        <View style={styles.box}>
          <Svg
            height={600}
            width={Dimensions.get("screen").width}
            viewBox="+20  0 1440 1420"
            style={styles.top}
          >
            <Path
              fill="#365486"
              d="M 6 429 Q 176 859 476 659 Q 776 459 986 494 Q 1196 529 1306 684 Q 1416 839 1526 1029 Q 1636 1219 1626 624 Q 1616 29 1636 19 Q 1656 9 1271 9 Q 886 9 821 14 Q 756 19 401 4 Q 46 -11 21 24 Q -4 59 1 149 Q 6 239 6 422.63"
            />
          </Svg>
        </View>
      </View>

      <View style={styles.formView}>
        <Animatable.Text animation="fadeInDown" style={styles.headerText}>
          Create Dealer
        </Animatable.Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
        />

        <TextInput
          style={styles.input}
          value={gst}
          onChangeText={(text) => setGST(text)}
          placeholder="GST"
        />

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="Phone"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="Location"
        />

        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
          multiline
        />

        <AnimatedTouchableOpacity
          animation="bounceIn"
          style={styles.submitButton}
          onPress={handleFormSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </AnimatedTouchableOpacity>
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
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#365486",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "#365486",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  top: {
    marginTop: -200,
  },
  formView: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddDealer;
