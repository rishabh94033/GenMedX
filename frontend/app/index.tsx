import * as React from 'react'
import { View, Text } from 'react-native'
import GoogleSignIn from '@/components/auth' // Import your auth component

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to GenMedX</Text>
      <GoogleSignIn />
    </View>
  )
}
