import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios or use fetch

export function useClerkSync() {
  const { user, isLoaded } = useUser();
  
  useEffect(() => {
    async function syncUser() {
      if (isLoaded && user) {
        try {
          // Replace with your actual backend API URL
          const backendUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
          
          // Send user data to your backend API
          await axios.post(`${backendUrl}/api/users/sync`, {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName
            // Add any other user data you want to sync
          });
          
          console.log('User synchronized with database');
        } catch (error) {
          console.error('Failed to sync user:', error);
        }
      }
    }
    
    syncUser();
  }, [isLoaded, user]);
  
  return { user, isLoaded };
}