import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { login, signInWithGoogle } from '@/src/lib/auth';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Success', 'Login successful!');
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Alert.alert('Success', 'Google sign-in successful!');
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
      <Text onPress={() => router.push('/signup')}>Don't have an account? Sign Up</Text>
    </View>
  );
};

export default LoginScreen;
