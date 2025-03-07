// import { supabase } from './supabase';
// import * as SecureStore from 'expo-secure-store';
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';

// WebBrowser.maybeCompleteAuthSession();
// // Save session token
// const saveSession = async (session: any) => {
//   if (session) {
//     await SecureStore.setItemAsync('supabase_session', JSON.stringify(session));
//   }
// };

// // Get saved session
// export const getSession = async () => {
//   const session = await SecureStore.getItemAsync('supabase_session');
//   return session ? JSON.parse(session) : null;
// };

// // Signup function
// export const signUp = async (email: string, password: string) => {
//   const { data, error } = await supabase.auth.signUp({ email, password });

//   if (error) throw new Error(error.message);
//   await saveSession(data.session);
  
//   return data;
// };

// // Login function
// export const login = async (email: string, password: string) => {
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//   if (error) throw new Error(error.message);
//   await saveSession(data.session);
  
//   return data;
// };

// // Logout function
// export const logout = async () => {
//   await supabase.auth.signOut();
//   await SecureStore.deleteItemAsync('supabase_session');
// };

// // Google Sign-in
// export const signInWithGoogle = async () => {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: AuthSession.makeRedirectUri({
//           // useProxy: true,  // Ensures the modal opens correctly in Expo
//         }),
//         scopes: 'email profile',
//       },
//     });
  
//     if (error) throw new Error(error.message);
//     return data;
//   };



import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  signInWithGoogle,
} from '@react-native-google-signin/google-signin'
import { supabase } from './supabase'








export default function () {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: 'YOUR CLIENT ID FROM GOOGLE CONSOLE',
  })

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices()
          const userInfo = await GoogleSignin.signIn()
          if (userInfo.data.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.data.idToken,
            })
            console.log(error, data)
          } else {
            throw new Error('no ID token present!')
          }
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
  )
}