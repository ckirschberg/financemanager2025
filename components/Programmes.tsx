import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";

type Programme = {
  id: number;
  name: string;
  price: number;
};

export default function Programmes() {

  const programmeItems = [
    {name: "Programme A", price: 10},
    {name: "Programme B", price: 15},
    {name: "Programme C", price: 20},
  ]

  return (
    <View style={styles.container}>
      {programmeItems &&
        programmeItems.map((programme, index) => (
          <>
            <View testID="programme-item" key={index}>
              <Text>{programme.name}</Text>
            </View>
          </>
        ))}
      <View style={styles.buttonGroup}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    paddingHorizontal: 40,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
