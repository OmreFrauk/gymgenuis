import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import {
  DraggableFlatList,
  ScaleDecorator,
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { searchFood } from "../lib/fatSecretAPI";
import DraggableFoodItem from "../components/DraggableFoodItem";

const MealTrackerScreen = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [breakfastFoods, setBreakfastFoods] = useState([]);
  const [lunchFoods, setLunchFoods] = useState([]);
  const [dinnerFoods, setDinnerFoods] = useState([]);
  const [snackFoods, setSnackFoods] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sourceList, setSourceList] = useState(null);

  const handleSearchFood = async () => {
    try {
      const results = await searchFood(food);
      if (results.length === 0) {
        Alert.alert(
          "No Food Found",
          "No food items were found matching your search."
        );
      }
      setFoodList(results);
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error fetching the food data. Please try again."
      );
    }
  };

  const handleAddFood = (mealType, foodItem) => {
    const addToMeal = (mealArray, setMealArray) => {
      const existingItem = mealArray.find(
        (item) => item.food_name === foodItem.food_name
      );
      if (existingItem) {
        setMealArray(
          mealArray.map((item) =>
            item.food_name === foodItem.food_name
              ? { ...item, count: (item.count || 1) + 1 }
              : item
          )
        );
      } else {
        setMealArray([...mealArray, { ...foodItem, count: 1 }]);
      }
    };

    switch (mealType) {
      case "Breakfast":
        addToMeal(breakfastFoods, setBreakfastFoods);
        break;
      case "Lunch":
        addToMeal(lunchFoods, setLunchFoods);
        break;
      case "Dinner":
        addToMeal(dinnerFoods, setDinnerFoods);
        break;
      case "Snacks":
        addToMeal(snackFoods, setSnackFoods);
        break;
      default:
        break;
    }
    setCalories(calories + foodItem.nf_calories);
  };

  const handleMoveFood = (
    fromList,
    setFromList,
    toList,
    setToList,
    foodItem
  ) => {
    setFromList(
      fromList.filter((item) => item.food_name !== foodItem.food_name)
    );
    setToList([...toList, foodItem]);
  };

  const renderDraggableFoodItem = ({ item, drag, isActive }) => (
    <DraggableFoodItem item={item} drag={drag} isActive={isActive} />
  );

  const onDragBegin = (item, listName) => {
    setDraggedItem(item);
    setSourceList(listName);
  };

  const onDragEnd = (toListName) => {
    if (!draggedItem || !sourceList || sourceList === toListName) {
      setDraggedItem(null);
      setSourceList(null);
      return;
    }

    let fromList, setFromList, toList, setToList;

    switch (sourceList) {
      case "Breakfast":
        fromList = breakfastFoods;
        setFromList = setBreakfastFoods;
        break;
      case "Lunch":
        fromList = lunchFoods;
        setFromList = setLunchFoods;
        break;
      case "Dinner":
        fromList = dinnerFoods;
        setFromList = setDinnerFoods;
        break;
      case "Snacks":
        fromList = snackFoods;
        setFromList = setSnackFoods;
        break;
      default:
        return;
    }

    switch (toListName) {
      case "Breakfast":
        toList = breakfastFoods;
        setToList = setBreakfastFoods;
        break;
      case "Lunch":
        toList = lunchFoods;
        setToList = setLunchFoods;
        break;
      case "Dinner":
        toList = dinnerFoods;
        setToList = setDinnerFoods;
        break;
      case "Snacks":
        toList = snackFoods;
        setToList = setSnackFoods;
        break;
      default:
        return;
    }

    handleMoveFood(fromList, setFromList, toList, setToList, draggedItem);
    setDraggedItem(null);
    setSourceList(null);
  };

  return (
    <NestableScrollContainer style={styles.container}>
      <Text style={styles.title}>Meal Tracker</Text>
      <TextInput
        style={styles.input}
        value={food}
        onChangeText={setFood}
        placeholder="Enter food name"
      />
      <Button title="Search Food" onPress={handleSearchFood} />
      <Text style={styles.sectionTitle}>Search Results</Text>
      <NestableDraggableFlatList
        data={foodList}
        renderItem={renderDraggableFoodItem}
        keyExtractor={(item) => item.food_name}
        onDragBegin={(item) => onDragBegin(item, "SearchResults")}
        onDragEnd={() => onDragEnd("SearchResults")}
      />
      <Text style={styles.sectionTitle}>Breakfast</Text>
      <NestableDraggableFlatList
        data={breakfastFoods}
        renderItem={renderDraggableFoodItem}
        keyExtractor={(item) => item.food_name}
        onDragBegin={(item) => onDragBegin(item, "Breakfast")}
        onDragEnd={() => onDragEnd("Breakfast")}
      />
      <Text style={styles.sectionTitle}>Lunch</Text>
      <NestableDraggableFlatList
        data={lunchFoods}
        renderItem={renderDraggableFoodItem}
        keyExtractor={(item) => item.food_name}
        onDragBegin={(item) => onDragBegin(item, "Lunch")}
        onDragEnd={() => onDragEnd("Lunch")}
      />
      <Text style={styles.sectionTitle}>Dinner</Text>
      <NestableDraggableFlatList
        data={dinnerFoods}
        renderItem={renderDraggableFoodItem}
        keyExtractor={(item) => item.food_name}
        onDragBegin={(item) => onDragBegin(item, "Dinner")}
        onDragEnd={() => onDragEnd("Dinner")}
      />
      <Text style={styles.sectionTitle}>Snacks</Text>
      <NestableDraggableFlatList
        data={snackFoods}
        renderItem={renderDraggableFoodItem}
        keyExtractor={(item) => item.food_name}
        onDragBegin={(item) => onDragBegin(item, "Snacks")}
        onDragEnd={() => onDragEnd("Snacks")}
      />
      <Text style={styles.totalCalories}>Total Calories: {calories} kcal</Text>
    </NestableScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  totalCalories: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default MealTrackerScreen;
