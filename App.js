import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import Loading from "./components/Loading";
import MainScreen from "./screens/MainScreen";
import SendScreen from "./screens/SendScreen";
import FindUserScreen from "./screens/FindUserScreen";
import AddUserScreen from "./screens/AddUserScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setLoggedIn(true);
          setLoading(true);
        } else {
          setLoggedIn(false);
          setLoading(true);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    return unsubscribed;
  }, []);

  if (!loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loggedIn ? (
          <Stack.Group>
            <Stack.Screen
              component={LoginScreen}
              name="LoginScreen"
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen component={MainScreen} name="MainScreen" />
            <Stack.Screen
              component={SendScreen}
              name="SendScreen"
              options={{
                headerShadowVisible: false,
                headerBackTitle: "",
              }}
            />
            <Stack.Screen
              component={FindUserScreen}
              name="FindUserScreen"
              options={{
                headerShadowVisible: false,
                headerBackTitle: "",
              }}
            />
            <Stack.Screen
              component={AddUserScreen}
              name="AddUserScreen"
              options={{
                headerShadowVisible: false,
                headerBackTitle: "",
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
