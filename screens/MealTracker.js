import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { searchFood } from "../lib/fatSecretAPI";

const MealTrackerScreen = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const handleSearchFood = async () => {
    try {
      const results = await searchFood(food);
      setFoodList(results);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const handleAddFood = (foodItem) => {
    setSelectedFoods([...selectedFoods, foodItem]);
    setCalories(calories + foodItem.nf_calories);
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => handleAddFood(item)}
    >
      <Text>
        {item.food_name} - {item.nf_calories} kcal
      </Text>
    </TouchableOpacity>
  );

  const renderSelectedFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Text>
        {item.food_name} - {item.nf_calories} kcal
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Tracker</Text>
      <TextInput
        style={styles.input}
        value={food}
        onChangeText={setFood}
        placeholder="Enter food name"
      />
      <Button title="Search Food" onPress={handleSearchFood} />
      <FlatList
        data={foodList}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.food_id}
        style={styles.foodList}
      />
      <FlatList
        data={selectedFoods}
        renderItem={renderSelectedFoodItem}
        keyExtractor={(item) => item.food_id}
        style={styles.foodList}
      />
      <Text style={styles.totalCalories}>Total Calories: {calories} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 20,
  },
  foodList: {
    marginTop: 20,
  },
  foodItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  totalCalories: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default MealTrackerScreen;
