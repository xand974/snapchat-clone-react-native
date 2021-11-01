import { REACT_APP_IOS_CLIENT_ID, REACT_APP_ANDROID_CLIENT_ID } from "@env";
import { signInWithCredential } from "firebase/auth";
import { GoogleAuthProvider } from "@firebase/auth";
import { logInAsync } from "expo-google-app-auth";
import { signOut } from "@firebase/auth";
import { auth } from "./firebase";

export const login = async (navigation) => {
  try {
    const result = await logInAsync({
      androidClientId: REACT_APP_ANDROID_CLIENT_ID,
      iosClientId: REACT_APP_IOS_CLIENT_ID,
      scopes: ["profile", "email"],
    });
    if (result.type === "success") {
      const { idToken, accessToken } = result;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(auth, credential);
      navigation.replace("MainScreen");
    } else {
      return { cancelled: true };
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (navigation) => {
  try {
    await signOut(auth).then(() => {
      navigation.replace("LoginScreen");
    });
  } catch (err) {
    console.log(err);
  }
};
