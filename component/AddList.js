import React, { useEffect, useState } from "react";
import {
  Center,
  Badge,
  TextArea,
  View,
  Text,
  Heading,
  Input,
  Button,
  Box,
  Select,
  Spacer,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ListModal } from "./Modal/ListModal.js";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { API, setAuthToken } from "./config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddList() {
  const [date, setDate] = useState();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  const [list, setList] = useState({
    name: "",
    category: "",
    date: "",
    desc: "",
  });

  // console.log("ini list", list);

  const handleOnChange = (name, value) => {
    setList({
      ...list,
      [name]: value,
    });
  };

  const handleOnPress = async () => {
    try {
      const response = await API.post("/List", { ...list, date });
      // console.log("ini response post list", response);
      alert("Data berhasil ditambahkan");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <View px="10" py="20" height={hp("100%")}>
      <Heading mb={5} fontSize="2xl">
        Add List
      </Heading>
      <Input
        mb={5}
        placeholder="Name"
        onChangeText={(value) => handleOnChange("name", value)}
        value={list.name}
      />
      <Select
        mb={5}
        placeholder="Category"
        minWidth="64"
        onValueChange={(value) => handleOnChange("category", value)}
      >
        {category.map(
          (item) =>
            item.id == data.id && (
              <Select.Item label={item.name} value={item.name} />
            )
        )}
      </Select>
      <View mb={5}>
        <Button
          variant="outline"
          colorScheme="success"
          onPress={() => setShowModal(true)}
        >
          <Text
            color="grey"
            marginRight="auto"
            textAlign="left"
            isTruncated
            maxW="200"
            w="100%"
            fontSize="xs"
          >
            {list.date ? list.date.toString() : "Choose Date"} <Spacer />
            <MaterialIcons name="calendar-today" size={15} color="black" />
          </Text>
        </Button>
        <ListModal
          list={list}
          setList={setList}
          date={date}
          setDate={setDate}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </View>
      <TextArea
        mb={5}
        totalLines={10}
        h={200}
        placeholder="Description"
        onChangeText={(value) => handleOnChange("desc", value)}
        value={list.desc}
      />
      <Button
        onPress={() => {
          handleOnPress();
        }}
        colorScheme="danger"
      >
        Add List To Do
      </Button>
    </View>
  );
}

export default AddList;
