import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Todo from './todos/Todo';
import NewCategoryScreen from './categories/NewCategoryScreen';
import CategoryList from './categories/CategoryList';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Frej does not like Typescript!</Text> */}
      {/* <Todo /> */}
      <CategoryList />
      {/* <NewCategoryScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
