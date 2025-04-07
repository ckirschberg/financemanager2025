import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Picture from '../components/picture';

export default function EntriesMain() {
  const [camera, setCamera] = useState(false);
  const [photoToDisplay, setPhotoToDisplay] = useState('')

  return (
    <View>

      {camera ? <Picture setCamera={setCamera} setPhotoToDisplay={setPhotoToDisplay}></Picture> : <></>}
      <Button title="Open camera" onPress={() => setCamera(true)}/>
    </View>
  )
}