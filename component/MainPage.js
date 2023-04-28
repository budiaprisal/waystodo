import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Badge,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  Select,
  Spacer,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Profile from "../images/profile.png";
import { ModalMain } from "./Modal/MainModal";
import { API, setAuthToken } from "./config/api";

function MainPage({ navigation }) {
  const [date, setDate] = useState();
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        const list = await API.get("/List");
        setList(list.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getList();
  }, []);

  const updateStatus = (index, status) => {
    if (status == false) {
      const res = API.patch(`/List/${index}`, { status: true });
      getList();
    } else {
      const res = API.patch(`/List/${index}`, { status: false });
      getList();
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const filter = list?.filter((p) => p.id == data.id);

  return (
    <View>
      <Flex
        height={hp("95%")}
        p={5}
        width={wp("90%")}
        flexDirection="column"
        mt={10}
      >
        <Flex direction="row" width={wp("90%")} mb={7}>
          <View justifyContent="center">
            <Text fontSize="xl" fontWeight="bold" marginBottom={0}>
              Hi {data.firstName}
            </Text>
            <Text fontSize="sm" color="grey" marginBottom={0}>
              {filter?.length} List
            </Text>
          </View>
          <Spacer />
          <Image
            source={Profile}
            alt="Alternate Text"
            size="sm"
            resizeMode="contain"
          />
        </Flex>
        <View mb={3} width={wp("90%")}>
          <Input
            placeholder="Search List ..."
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="mic" />}
              />
            }
          />
        </View>

        <Flex mb={10} width={wp("90%")} direction="row">
          <View width={wp("29%")}>
            <Button
              height="46px"
              leftIcon={
                <MaterialIcons name="calendar-today" size={15} color="black" />
              }
              variant="outline"
              colorScheme="success"
              onPress={() => setShowModal(true)}
            >
              <Text isTruncated maxW="90" w="90%" fontSize="xs">
                {date ? date.toDateString() : "Choose Date"}
              </Text>
            </Button>
          </View>
          <ModalMain
            date={date}
            setDate={setDate}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <Spacer />
          <View width={wp("29%")}>
            <Select placeholder="Category" minWidth="20">
              {category.map(
                (item) =>
                  item?.id == data.id && (
                    <Select.Item label={item.name} value={item.name} />
                  )
              )}
            </Select>
          </View>
          <Spacer />
          <View width={wp("29%")}>
            <Select placeholder="Status" minWidth="20">
              <Select.Item label="Finished" value="true" />
              <Select.Item label="Ongoing" value="false" />
            </Select>
          </View>
        </Flex>

        <ScrollView>
          {list.map(
            (item, index) =>
              item.id === data.id && (
                <View
                  key={(index = item.id)}
                  width={wp("100%")}
                  mb={2}
                  backgroundColor="blue.100"
                  p={2}
                  rounded="md"
                >
                  <Flex flexDirection="row" mb={3} width={wp("85%")}>
                    {item?.status == true ? (
                      <Text
                        strikeThrough
                        fontSize="lg"
                        fontWeight="bold"
                        onPress={() =>
                          navigation.navigate("Detail", { listData: item })
                        }
                      >
                        {item?.name}
                      </Text>
                    ) : (
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        onPress={() =>
                          navigation.navigate("Detail", { listData: item })
                        }
                      >
                        {item.name}
                      </Text>
                    )}
                    <Spacer />
                    <Badge colorScheme="darkBlue" rounded="md">
                      <Text color="white">{item.category}</Text>
                    </Badge>
                  </Flex>
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    width={wp("85%")}
                  >
                    <View width={wp("60%")}>
                      <Text mb={5} color="grey" fontSize="xs" width="100%">
                        {item.desc}
                      </Text>
                      <Text color="grey" fontSize="xs" width="100%">
                        <Icon as={MaterialIcons} name="calendar-today" />
                        {item.date}
                      </Text>
                    </View>
                    <Spacer />

                    <View>
                      {item.status == true ? (
                        <Center
                          backgroundColor="green.500"
                          rounded="full"
                          height={50}
                        >
                          <MaterialIcons
                            resizeMode="contain"
                            name="check"
                            size={50}
                            color="white"
                            onPress={() => updateStatus(item.id, item.status)}
                          />
                        </Center>
                      ) : (
                        <Center
                          backgroundColor="green.500"
                          rounded="full"
                          height={50}
                        >
                          <AntDesign
                            resizeMode="contain"
                            name="minus"
                            size={50}
                            color="white"
                            onPress={() => updateStatus(item.id, item.status)}
                          />
                        </Center>
                      )}
                    </View>
                  </Flex>
                </View>
              )
          )}
        </ScrollView>
      </Flex>

      {/* <ScrollView marginTop={10} showsVerticalScrollIndicator={false}>
        <FlatList
          data={list}
          renderItem={_dataListRender}
          keyExtractor={(item) => item}
        />
      </ScrollView> */}
    </View>
  );
}

export default MainPage;
