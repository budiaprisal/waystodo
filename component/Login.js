import React, { useState } from "react";
import {
  Center,
  Text,
  Button,
  Input,
  Link,
  View,
  Image,
  Spacer,
} from "native-base";
import ImageLogin from "../images/Login.png";
import { FontAwesome } from "@expo/vector-icons";
import { API } from "./config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnPress = async () => {
    try {
      setIsLoading(true);
      const response = await API.post("/auth/login", form);
      // console.log(response);
      setIsLoading(false);
      if (response) {
        await AsyncStorage.setItem("token", response.data.token);
      }

      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
        navigation.navigate("MainPage");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Center p="10" py={20} height="100%">
      <Image
        source={ImageLogin}
        alt="Alternate Text"
        size="2xl"
        resizeMode="contain"
      />

      <Input
        backgroundColor="white"
        placeholder="Email"
        type="email"
        mb={4}
        onChangeText={(value) => handleOnChange("email", value)}
        value={form.email}
      />
      <Input
        backgroundColor="white"
        placeholder="Password"
        type="password"
        mb={4}
        onChangeText={(value) => handleOnChange("password", value)}
        value={form.password}
      />
      <View height={20} width="100%">
        <Button onPress={handleOnPress} mb={3} colorScheme="danger">
          Login
        </Button>
      </View>
      <Text textDecoration="none" textAlign="center">
        New Users ?
        <Text
          color="red.500"
          textDecoration="none"
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Register
        </Text>
      </Text>
      <Spacer />
      <Text onPress={() => navigation.navigate("Home")}>
        <FontAwesome name="home" size={24} color="black" />
        Home
      </Text>
    </Center>
  );
}

export default Login;
