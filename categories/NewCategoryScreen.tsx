import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CategoryEntity } from './CategoryEntity';
import { CategoriesAPI } from './CategoriesAPI';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { createCategory } from './categorySlice';


const NewCategoryScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>()

  const onCreateCategory = async () => {
    const newCategory = new CategoryEntity(title);

    dispatch(createCategory(newCategory)) // dispatches an action (createCategory)
    // try {
    //   const createdCategory = await CategoriesAPI.createCategory(newCategory);
        
    //   console.log('Category created:', createdCategory);
    // } catch (error) {
    //   console.error('Error:', error);
    //   console.log(error);
      
    // }
  };

  return (
    <View style={styles.container}>
      <Text>Create a New Category</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Enter category title"
      />
      <Button
        onPress={onCreateCategory}
        title="Create Category"
        color="#841584"
        accessibilityLabel="Create a new category"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default NewCategoryScreen;