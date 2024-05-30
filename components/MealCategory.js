import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DraggableFoodItem from "./DraggableFoodItem";

const MealCategory = ({ title, items, onPress, onMove }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <View style={styles.foodItemContainer}>
          <FoodItem item={item} onPress={onPress} />
          {onMove && (
            <View style={styles.moveButtons}>
              <TouchableOpacity onPress={() => onMove(item, "Breakfast")}>
                <Text style={styles.moveButton}>Move to Breakfast</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onMove(item, "Lunch")}>
                <Text style={styles.moveButton}>Move to Lunch</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onMove(item, "Dinner")}>
                <Text style={styles.moveButton}>Move to Dinner</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onMove(item, "Snacks")}>
                <Text style={styles.moveButton}>Move to Snacks</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      keyExtractor={(item) => item.food_id}
      style={styles.foodList}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  foodList: {
    marginTop: 10,
  },
  foodItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  moveButtons: {
    flexDirection: "row",
    marginLeft: 10,
  },
  moveButton: {
    color: "#007BFF",
    marginHorizontal: 5,
  },
});

export default MealCategory;
