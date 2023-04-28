import { Text, View, Heading, Flex, Center, Spacer } from "native-base";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";

function DetailTodo({ route }) {
  const { listData } = route.params;

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
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

      const list = await API.get("/List");
      setList(list.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View
      my={20}
      mx={5}
      px={5}
      py={5}
      height={heightPercentageToDP("85%")}
      rounded="2xl"
      backgroundColor="blue.200"
    >
      <Flex direction="row" mb={5} justifyContent="center">
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            {" "}
            {listData.name}{" "}
          </Text>
        </Center>
        <Spacer />
        <View>
          <View
            mb={3}
            rounded="full"
            py={1}
            px={2}
            style={{ backgroundColor: "red", alignSelf: "flex-start" }}
          >
            <Text style={{ color: "#ffffff" }}>{listData.category}</Text>
          </View>
          {listData.status == true ? (
            <Center backgroundColor="green.500" rounded="full" height={50}>
              <MaterialIcons
                resizeMode="contain"
                name="check"
                size={50}
                color="white"
              />
            </Center>
          ) : (
            <Center backgroundColor="red.500" rounded="full" height={50}>
              <AntDesign
                resizeMode="contain"
                name="minus"
                size={50}
                color="white"
              />
            </Center>
          )}
        </View>
      </Flex>
      <View>
        <Text>{listData.desc}</Text>
      </View>
    </View>
  );
}

export default DetailTodo;
