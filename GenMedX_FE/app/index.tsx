// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }


import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ClerkProviderWrapper from '@/src/hooks/ClerkProviders';
import { useClerkSync } from '@/src/providers/useClerk';

function AppContent() {
  const { user, isLoaded } = useClerkSync();
  
  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <View style={styles.container}>
      {user ? (
        <Text>Logged in as: {user.firstName}</Text>
      ) : (
        <Text>Not logged in</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <ClerkProviderWrapper>
      <AppContent />
    </ClerkProviderWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});