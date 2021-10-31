import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import Loading from "./components/Loading";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(
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
            <Stack.Screen component={HomeScreen} name="HomeScreen" />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
