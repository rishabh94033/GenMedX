import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Page() {
  const { user } = useUser()
  const navigation = useNavigation();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <TouchableOpacity onPress={() => navigation.navigate('/(auth)/sign-in' as never)}>
            
          <Text>Sign in</Text>
            </TouchableOpacity>
        
        
        
            <TouchableOpacity onPress={() => navigation.navigate('/(auth)/sign-up' as never)}>
            
            <Text>Sign in</Text>
              </TouchableOpacity>
      </SignedOut>
    </View>
  )
}