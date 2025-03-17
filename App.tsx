import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Todo from './todos/Todo';
import CategoryList from './categories/CategoryList';
import NewCategoryScreen from './categories/NewCategoryScreen';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntriesMain from './entries/EntriesMain';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Counter } from './counter/counter';
import { SignupScreen } from './users/SignupScreen';

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

export default function App() {
  return (
    <Provider store={store}>
      <LoginSignupScreens />
      {/* <Navigation /> */}
    </Provider>
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
