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
import ImageRegister from "../images/Login.png";
import { FontAwesome } from "@expo/vector-icons";
import { API } from "./config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Register({ navigation }) {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnPress = async () => {
    try {
      const response = await API.post("/auth/register", form);
      console.log(response);

      if (response) {
        await AsyncStorage.setItem("token", response.data.token);
      }

      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <Center
      p={10}
      py={20}
      justifyContent="center"
      height="100%"
      backgroundColor="red.100"
    >
      <Image
        source={ImageRegister}
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
        placeholder="Name"
        type="text"
        mb={4}
        onChangeText={(value) => handleOnChange("firstName", value)}
        value={form.firstName}
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
        <Button
          mb={3}
          colorScheme="danger"
          onPress={() => {
            handleOnPress();
          }}
        >
          Register
        </Button>
      </View>
      <Text textDecoration="none" textAlign="center">
        Already Joined ?
        <Text
          color="red.500"
          textDecoration="none"
          onPress={() => navigation.navigate("Login")}
        >
          {" "}
          Login
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

export default Register;
