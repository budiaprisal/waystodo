import React, { useEffect, useState } from "react";
import {
  Center,
  Badge,
  View,
  Text,
  Heading,
  Input,
  Button,
  Box,
  Flex,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { API, setAuthToken } from "./config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddCate() {
  const [cate, setCate] = useState({
    name: "",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState([]);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token === null) {
        navigation.navigate("Login");
      } else {
        setAuthToken(token);
      }

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      setIsLoading(true);

      const res = await API.get("/auth/user", config);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        const response = await API.get("/Category");
        setCategory(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCate();
  }, [category]);

  const handleOnChange = (name, value) => {
    setCate({
      ...cate,
      [name]: value,
    });
  };

  console.log(data);

  const handleOnPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        const response = await API.post("/Category", cate);
        getCate();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View px="10" py="20" height={hp("100%")}>
      <Heading mb={5} fontSize="2xl">
        Add Category
      </Heading>
      <Input
        mb={5}
        placeholder="New Category"
        onChangeText={(value) => handleOnChange("name", value)}
        value={cate.name}
      />
      <Button bg="danger.500" onPress={handleOnPress}>
        Add New Category
      </Button>
      <Box p="12" rounded="lg"></Box>

      <Heading fontSize="2xl" mb={3}>
        List Category
      </Heading>
      <Flex direction="row" flexWrap="wrap">
        {category.map(
          (item) =>
            item.id == data.id && (
              <View
                rounded="full"
                py={1}
                px={2}
                mr="2"
                mb={2}
                style={{ backgroundColor: "red", alignSelf: "flex-start" }}
              >
                <Text style={{ color: "#ffffff" }}>{item.name}</Text>
              </View>
            )
        )}
      </Flex>
    </View>
  );
}

export default AddCate;
