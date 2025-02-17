import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { CategoryEntity } from './CategoryEntity';
import { CategoriesAPI } from './CategoriesAPI';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const CategoryList: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CategoryList'>;
  const navigation = useNavigation<NavigationProp>();

  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);


  // Render a single category item
  const renderItem = ({ item }: { item: CategoryEntity }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : categories.length > 0 ? (
        <View>
            <Button onPress={() => navigation.navigate('NewCategory')} title="Create new Category" color="#841584" />
            <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString() }
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            />
        </View>
      ) : (
        <Text style={styles.emptyMessage}>No categories found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
});

export default CategoryList;
