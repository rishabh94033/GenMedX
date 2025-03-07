// import * as React from 'react'
// import { Button } from 'react-native'
// import * as WebBrowser from 'expo-web-browser'
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
// import { supabase } from '../utils/supabase'

// WebBrowser.maybeCompleteAuthSession()

// const CLIENT_ID = '967242082232-g158849vtijhdm26sukem4arp2pci7ra.apps.googleusercontent.com'

// // Use correct redirect URI depending on the environment
// const REDIRECT_URI = makeRedirectUri()

// console.log("Redirect URI:", REDIRECT_URI);


// const discovery = {
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//   tokenEndpoint: 'https://oauth2.googleapis.com/token',
//   revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
// }

// export default function GoogleSignIn() {
//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       redirectUri: REDIRECT_URI,
//       scopes: ['openid', 'email', 'profile'],
//       responseType: 'id_token',
//       usePKCE: false, // Enable PKCE for better security
 
//     },
//     discovery
//   )

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params
//       signInWithSupabase(id_token)
//     }
//   }, [response])

//   async function signInWithSupabase(idToken: string) {
//     try {
//       const { data, error } = await supabase.auth.signInWithIdToken({
//         provider: 'google',
//         token: idToken,
//       })

//       if (error || !data) throw error
//       console.log('User signed in:', data)
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Supabase Sign-In Error:', error.message)
//       } else {
//         console.error('Supabase Sign-In Error:', error)
//       }
//     }
//   }

//   return <Button title="Sign in with Google" onPress={() => promptAsync()} disabled={!request} />
// }




import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../utils/supabase'
import { Input , Button} from '@rneui/themed';



// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text:any) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text:any) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})