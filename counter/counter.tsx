import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { decrement, increment } from '../store/counterSlice'
import { Button, View, Text } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { reloadJwtFromStorage } from '../users/userSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()


  useEffect(() => {
    async function getValueFor() {
      const userObj = JSON.parse(await SecureStore.getItemAsync('object') || '')
      console.log("userObj", userObj);
      dispatch(reloadJwtFromStorage(userObj)) // in my code, I have no token
      // Instead, do the login functionality and save the token instead of the user.
    }
    getValueFor()
  }, [])
  
  

  return (
    <View>
        <Button title="increment" onPress={() => dispatch(increment())} />
          
        <Text>{count.toString()}</Text>
        <Button title="decrement" onPress={() => dispatch(decrement())} />
    </View>
  )
}