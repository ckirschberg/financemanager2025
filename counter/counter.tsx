import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { decrement, increment } from '../store/counterSlice'
import { Button, View, Text } from 'react-native'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  
  return (
    <View>
        <Button title="increment" onPress={() => dispatch(increment())} />
          
        <Text>{count.toString()}</Text>
        <Button title="decrement" onPress={() => dispatch(decrement())} />
    </View>
  )
}