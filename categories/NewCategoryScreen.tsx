import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CategoryEntity } from './CategoryEntity';
import { CategoriesAPI } from './CategoriesAPI';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from './categorySlice';
import { QueryClient, useMutation } from '@tanstack/react-query';


const NewCategoryScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>()
  const error = useSelector((state: RootState) => state.category.errormessage) // view subscribes to the store

  const queryClient = new QueryClient()

  // Mutations
  const mutation = useMutation({
    mutationFn: async (newCategory: CategoryEntity) => {
      console.log(newCategory);
      
      const response = await fetch('http://127.0.0.1:3000/categories', {method: 'POST', 
        body: JSON.stringify(newCategory),
        headers: {
          'Content-Type': 'application/json',
      }
      })
      console.log(response);
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const onCreateCategory = async () => {
    const newCategory = new CategoryEntity(title);
    mutation.mutate(newCategory);

    //dispatch(createCategory(newCategory)) // dispatches an action (createCategory) // redux
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
      <Text>{error}</Text>
      
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