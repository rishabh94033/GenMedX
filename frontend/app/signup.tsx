import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signUp, signInWithGoogle } from '@/src/lib/auth';
import { useRouter } from 'expo-router';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      Alert.alert('Success', 'Signup successful. Please check your email.');
      router.push('/login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      Alert.alert('Success', 'Google sign-up successful!');
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Text>Signup</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Sign up with Google" onPress={handleGoogleSignUp} />
      <Text onPress={() => router.push('/login')}>Already have an account? Login</Text>
    </View>
  );
};

export default SignupScreen;
