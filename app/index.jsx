import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    const storedUser = await AsyncStorage.getItem("user");

    if (!storedUser) {
      setMessage("No registered user found");
      return;
    }

    const { name, email: savedEmail, password: savedPass } =
      JSON.parse(storedUser);

    if (email === savedEmail && password === savedPass) {
      setMessage(`Welcome back, ${name}!`);
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/img.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]}
        style={styles.overlay}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login This Form</Text>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.register}>New user? Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { ...StyleSheet.absoluteFillObject },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    paddingVertical: 35,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#222", textAlign: "center" },
  subtitle: { fontSize: 15, color: "#888", textAlign: "center", marginBottom: 25 },
  message: { textAlign: "center", color: "green", marginBottom: 10 },
  input: {
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    height: 50,
    backgroundColor: "#4c6ef5",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  register: { color: "#222", textAlign: "center", marginTop: 12, fontWeight: "600" },
});
