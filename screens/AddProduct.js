import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import Svg, { Path } from "react-native-svg";
import SuccessNotification from "./Notification/SuccessNotification";
import ErrorNotification from "./Notification/ErrorNotification";
import * as ImagePicker from "expo-image-picker";

const AnimatedTouchableOpacity =
  Animatable.createAnimatableComponent(TouchableOpacity);

const AddProduct = ({ navigation }) => {
  const [companyName, setCompanyName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [model, setModel] = React.useState("");
  const [specification, setSpecification] = React.useState("");
  const [warranty, setWarranty] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [imageUri, setImageUri] = React.useState("");
  const [notificationVisible, setNotificationVisible] = React.useState("");
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [productImage, setProductImage] = React.useState(null);

  const openImagePicker = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "Please allow access to the photo library."
        );
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(pickerResult);
      setImage(pickerResult);
      setImageUri(image.assets[0].uri);

      if (!pickerResult.canceled) {
        setImage(pickerResult);
      }
    } catch (error) {
      console.log("Error picking an image:", error);
    }
  };

  const showNotification = (message, value) => {
    setNotificationMessage(message);
    setNotificationVisible(value);
  };

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const handleFormSubmit = async () => {
    try {
      const warrantyToNum = parseFloat(warranty);
      const formData = new FormData();

      formData.append("image", {
        uri: image.assets[0].uri,
        type: "image/png",
        name: "profile-image",
      });
      formData.append("companyName", companyName);
      formData.append("category", category);
      formData.append("model", model);
      formData.append("specification", specification);
      formData.append("warrantyToNum", warrantyToNum);
      formData.append("imageUri", imageUri);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transsformRequest: () => {
          return formData;
        },
      };
      const { data } = await axios.post(
        "http://192.168.137.92:4000/api/v1/new-product",
        formData,
        config
      );

      showNotification("Product created successfully", 1);

      navigation.navigate("ProductBarScan", { id: data.product._id });
    } catch (error) {
      showNotification("Some error Occured", 2);
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
          Create Product
        </Animatable.Text>

        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
          placeholder="Company Name"
        />

        <TextInput
          style={styles.input}
          value={category}
          onChangeText={(text) => setCategory(text)}
          placeholder="Category"
        />

        <TextInput
          style={styles.input}
          value={model}
          onChangeText={(text) => setModel(text)}
          placeholder="Model"
        />
        <TextInput
          style={styles.input}
          value={specification}
          onChangeText={(text) => setSpecification(text)}
          placeholder="Specification"
        />
        <TextInput
          style={styles.input}
          value={warranty.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setWarranty(parseFloat(text))}
          placeholder="Warranty"
        />

        {/* ----- */}
        {/* <View style={{ marginBottom: 20 }}>
          <Button title="Select Product Image" onPress={openImagePicker} />
          {productImage && (
            <Image
              source={productImage}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View> */}

        <View>
          <Button title="Pick an Image" onPress={openImagePicker} />
          {image && (
            <Image
              source={{ uri: image.assets[0].uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        {/* ------ */}

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
    color: "#365486",
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

export default AddProduct;
