import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProductQR from "./ProductQR";

const ProductBarScan = ({ route }) => {
  const id = route.params.id;

  return (
    <View style={styles.scanContainer}>
      <Text style={styles.scanText}>Scan QR</Text>
      <View style={styles.scanWindow}>
        <ProductQR style={styles.QR} proId={id} />
      </View>
      <Text style={styles.scanGuide}>Place QR Inside The Window</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scanContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  scanWindow: {
    width: "43%",
    height: "39.8%",
    borderWidth: 3,
    borderColor: "#15a6d1",
  },
  QR: {
    width: 100,
    height: 300,
  },
  scanText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#15a6d1",
    marginBottom: 50,
  },
  scanGuide: {
    fontSize: 20,
    fontWeight: "400",
    color: "grey",
    marginTop: 50,
  },
});

export default ProductBarScan;
