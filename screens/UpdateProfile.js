import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const ProfileUpdateScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@mail.com",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
  });

  const handleSave = () => {
    // Implement save logic here
    console.log("Profile saved:", profile);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon color="#000" name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Profile</Text>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.content}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(name) => setProfile({ ...profile, name })}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(email) => setProfile({ ...profile, email })}
          placeholder="Email"
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 20,
  },
});

export default ProfileUpdateScreen;
