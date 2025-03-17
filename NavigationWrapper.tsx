import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignupScreen } from "./users/SignupScreen";
import CategoryList from "./categories/CategoryList";
import NewCategoryScreen from "./categories/NewCategoryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Counter } from "./counter/counter";
import { createStaticNavigation } from "@react-navigation/native";

export type RootStackParamList = {
    CategoryList: undefined; // No parameters
    NewCategory: undefined; // No parameters for this route
    // CategoryDetails: { id: number }; // Example for a route with parameters
  };
  
  export type LoginSignupStackParamList = {
    SignupScreen: undefined; // No parameters
    // LoginScreen: undefined; // No parameters for this route
  };
  
  const LoginSignupStack = createNativeStackNavigator<LoginSignupStackParamList>({
    screens: {
      SignupScreen: SignupScreen,
      // LoginScreen: LoginScreen
    },
  });
  
  
  const CategoryStack = createNativeStackNavigator<RootStackParamList>({
    screens: {
      CategoryList: CategoryList,
      NewCategory: NewCategoryScreen
    },
  });
  
  const HomeTabs = createBottomTabNavigator({
    screens: {
      Entries: Counter,
      Categories: CategoryStack,
    },
  });
  
  const Navigation = createStaticNavigation(HomeTabs);
  
  const LoginSignupScreens = createStaticNavigation(LoginSignupStack);
  
export default function NavigationWrapper() {
    const token = useSelector((state: RootState) => state.user.token);
  
  return (
    <View>
        {token ? (
            <>
            <Navigation />
            </>
        ) : (
            <>
            <LoginSignupScreens />
            </>
        )}
  </View>          
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  