import React from "react";
import { Text, View, Image, Center, Button, Flex, Spacer } from "native-base";
import Homepage from "../images/home.png";

function Home({ navigation }) {
  return (
    <Center height="100%">
      <View width="90%" height="80%" alignItems="center">
        <Image
          source={Homepage}
          alt="Alternate Text"
          size="2xl"
          resizeMode="contain"
        />
        <View width="70%">
          <Text
            textAlign="center"
            fontSize={35}
            fontWeight="bold"
            position="relative"
            marginTop={-10}
          >
            Ways <Text color="red.600">To</Text>
            <Text color="red.500">Do</Text>
          </Text>
          <Text fontSize="xs" textAlign="center">
            Write your activity and finish your activity. Fast, Simple and Easy
            to Use
          </Text>
        </View>
        <Spacer />
        <Flex direction="column">
          <View>
            <Button
              onPress={() => navigation.navigate("Login")}
              mb={3}
              colorScheme="danger"
              px={100}
            >
              Login
            </Button>

            <Button
              onPress={() => navigation.navigate("Register")}
              colorScheme="coolGray"
              px={100}
            >
              Register
            </Button>
          </View>
        </Flex>
      </View>
    </Center>
  );
}

export default Home;
