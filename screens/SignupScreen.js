// screens/CreateAccountScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  RadioButton,
  Snackbar,
} from "react-native-paper";
import pb from "../lib/pocketbase";

export default function CreateAccountScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [purpose, setPurpose] = useState("gain"); // Default to gain weight
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false); // Snackbar visibility
  const data = {
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: confirmPassword,
    name: name,
    purpose: purpose === "gain" ? "1" : "2",
    height: height,
    weight: weight,
  };
  const handleCreateAccount = () => {
    // Reset errors
    setErrors({});

    // Validate inputs
    let valid = true;
    let newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    if (!height) {
      newErrors.height = "Height is required";
      valid = false;
    }
    if (!weight) {
      newErrors.weight = "Weight is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    console.log(data);
    pb.collection("users")
      .create(data)
      .then(() => {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          navigation.navigate("Login"); // Navigate to Login screen after successful account creation
        }, 3000); // Adjust the delay as needed
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Height (cm)"
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Weight (kg)"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.purposeTitle}>Purpose</Text>
      <RadioButton.Group
        onValueChange={(value) => setPurpose(value)}
        value={purpose}
      >
        <View style={styles.radioOption}>
          <RadioButton value="gain" />
          <Text>Gain Weight</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton value="lose" />
          <Text>Lose Weight</Text>
        </View>
      </RadioButton.Group>
      <Button
        mode="contained"
        onPress={handleCreateAccount}
        style={styles.button}
        disabled={loading}
      >
        Create Account
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
      >
        Account has been created successfully!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBcottom: 20,
  },
  purposeTitle: {
    fontSize: 18,
    marginTop: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
  },
});
