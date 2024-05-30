import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";

const DraggableFoodItem = ({ item, drag, isActive }) => (
  <ScaleDecorator>
    <TouchableOpacity
      style={[styles.container, isActive ? styles.active : null]}
      onLongPress={drag}
      disabled={isActive}
    >
      <Image source={{ uri: item.photo.thumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.food_name}</Text>
        <Text style={styles.calories}>{item.nf_calories} kcal</Text>
        {item.count != null && (
          <Text style={styles.count}>Count: {item.count}</Text>
        )}
      </View>
    </TouchableOpacity>
  </ScaleDecorator>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  active: {
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calories: {
    fontSize: 14,
    color: "#888",
  },
  count: {
    fontSize: 14,
    color: "#007BFF",
  },
});

export default DraggableFoodItem;
