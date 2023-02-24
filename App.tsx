/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/screens/SignIn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import EncryptedStorage from 'react-native-encrypted-storage';
import {authReducer, initialState, AuthContext} from './src/utils/AuthUtils';
import {WithSplashScreen} from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [authState, dispatch] = React.useReducer(authReducer, initialState);

  let ScreenHeight = Dimensions.get('window').height;

  useEffect(() => {
    async function retrieveUserSession() {
      try {
        const session = await EncryptedStorage.getItem('user_session');
        if (session) {
          dispatch({
            type: 'restore_user',
            payload: JSON.parse(session),
          });
        }else{
          dispatch({
            type: 'set_app_loaded'
          })
        }

      } catch (error) {
        // There was an error on the native side
        console.log(error?.code);
      }
    }
    retrieveUserSession();
  }, []);

  return (
    <WithSplashScreen isAppReady={!authState.isLoading}>
      <NavigationContainer>
        <AuthContext.Provider value={{authState, dispatch}}>
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <View
                style={[
                  {backgroundColor: '#FFFFFFFF', minHeight: ScreenHeight},
                ]}>
                <Stack.Navigator>
                  {authState.token ? (
                    <Stack.Group>
                      <Stack.Screen name="Home" component={Home} />
                    </Stack.Group>
                  ) : (
                    <Stack.Group
                      screenOptions={{headerShown: false, animation: 'none'}}>
                      <Stack.Screen name="SignIn" component={SignIn} />
                      <Stack.Screen name="SignUp" component={SignUp} />
                    </Stack.Group>
                  )}
                </Stack.Navigator>
              </View>
            </ScrollView>
          </SafeAreaView>
        </AuthContext.Provider>
      </NavigationContainer>
    </WithSplashScreen>
  );
}

export default App;
