import * as React from "react";

//Import Navigation Container
import { NavigationContainer } from "@react-navigation/native";

// Import Stack Navigation
import { createStackNavigator } from "@react-navigation/stack";

//Import Bottom Tab Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Import Icon
import { Ionicons } from "@expo/vector-icons";

// Import Screen
import AddCate from "./component/AddCate";
import AddList from "./component/AddList";
import Detail from "./component/DetailTodo";
import Home from "./component/Home.js";
import Login from "./component/Login.js";
import MainPage from "./component/MainPage.js";
import Register from "./component/Register.js";

// Create Stack Navigation
const Stack = createStackNavigator();

//Create Bottom Tab Navigation
const Tab = createBottomTabNavigator();

// Create Component Bottom Tab Navigation
const MyTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerMode: "screen",
        headerTintColor: "indigo",
        headerStyle: { backgroundColor: "pink" },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "ToDO List") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } else if (route.name === "Add Category") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Add List") {
            iconName = focused ? "shapes-sharp" : "shapes-outline";
          }

          return <Ionicons name={iconName} size={30} color="orange" />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "blue",
      })}
    >
      <Tab.Screen name="ToDO List" component={MainPage} />
      <Tab.Screen name="Add Category" component={AddCate} />
      <Tab.Screen name="Add List" component={AddList} />
    </Tab.Navigator>
  );
};

export default function Container() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerTintColor: "red",
            headerMode: "screen",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register",
            headerTintColor: "red",
            headerMode: "screen",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainPage"
          component={MyTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
