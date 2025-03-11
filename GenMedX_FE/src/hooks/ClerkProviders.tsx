import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

// Token cache for Clerk
const tokenCache = {
  getToken: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  saveToken: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || ''}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
}