import React from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { logout } from '@/src/lib/auth';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Success', 'Logged out successfully!');
      router.replace('/signup');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Text>Welcome to Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
