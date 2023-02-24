import React, {useState, useEffect, useContext} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {sharedStyle} from '../styles/shared';
import {MaterialIcon} from './Icon';
import {useRoute} from '@react-navigation/native';
import {IconButton} from './IconButton';
import NoInternetModal from '../utils/NoInternetModal';
import useOnlineStatus from '../lib/hooks/useOnlineStatus';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthContext } from '../utils/AuthUtils';

function AuthInputs() {
  const [userName, setuserName] = useState<string>('kminchelle');
  const [password, setpassword] = useState<string>('0lelplR');
  const [passwordVisible, setpasswordVisible] = useState<boolean>(false);
  const [errorMsg, seterrorMsg] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const {dispatch} = useContext(AuthContext);

  const route = useRoute();
  const currentScreen = route.name;

  const isOffline = useOnlineStatus();

  const handleLogin = () => {
    if (!userName || !password) {
      console.log('empty values found');
      return;
    }

    if (userName !== 'kminchelle' || password !== '0lelplR') {
      seterrorMsg("User Name & Password can't be changed in this prototype!");

      setTimeout(() => {
        seterrorMsg('');
      }, 5000);
      return;
    }

    setloading(true);
    axios
      .post(
        'https://dummyjson.com/auth/login',
        {
          username: userName,
          password,
        },
        {headers: {'content-type': 'application/json'}},
      )
      .then(function (response) {
        EncryptedStorage.setItem('user_session', JSON.stringify(response.data));
        dispatch({
          type: "sign_in", payload: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
        seterrorMsg(error?.message || 'Error! Try Again');

        setTimeout(() => {
          seterrorMsg('');
        }, 3000);
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            value={userName}
            onChangeText={val => setuserName(val)}
          />
          <View style={styles.iconContainer}>
            <MaterialIcon name="account-outline" size="large" color="#575656" />
          </View>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={val => setpassword(val)}
          />
          <View style={[styles.iconContainer, {right: 3, bottom: 6}]}>
            <IconButton
              name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
              size="large"
              color="#575656"
              onPress={() => setpasswordVisible(!passwordVisible)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.signInBtn, {backgroundColor: '#E02D1D'}]}
        onPress={handleLogin}
        disabled={loading}>
        <View>
          <Text
            style={{
              fontFamily: 'Mulish-SemiBold',
              fontSize: 20,
              color: '#FFAD9D',
            }}>
            {currentScreen === 'SignIn' ? 'Sign In' : 'Sign Up'}
          </Text>
        </View>
      </TouchableOpacity>
      {errorMsg && <Text style={sharedStyle.errorText}>{errorMsg}</Text>}
      <Text style={styles.ORText}>OR</Text>
      <View style={styles.loginIconsContainer}>
        <View style={{width: 40, height: 40}}>
          <Image
            style={styles.loginIconImg}
            source={require('F:/Hemant Projects/AwesomeProject/src/assets/images/google_logo.png')}
          />
        </View>
        <View style={{width: 40, height: 40}}>
          <Image
            style={styles.loginIconImg}
            source={require('F:/Hemant Projects/AwesomeProject/src/assets/images/fb_logo.png')}
          />
        </View>
        <View style={{width: 40, height: 40}}>
          <Image
            style={styles.loginIconImg}
            source={require('F:/Hemant Projects/AwesomeProject/src/assets/images/apple_logo.png')}
          />
        </View>
      </View>
      <NoInternetModal
        show={isOffline}
        onRetry={handleLogin}
        isRetrying={loading}
      />
    </>
  );
}

export default AuthInputs;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: 30,
    gap: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    height: 50,
    backgroundColor: 'white',
    borderColor: '#9095A1FF',
    borderRadius: 5,
    fontFamily: 'Mulish-Regular',
  },
  inputBox: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 14,
    right: 20,
  },
  signInBtn: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  ORText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 40,
    fontSize: 18,
    color: '#9095A1FF',
    fontFamily: 'Mulish-SemiBold',
  },
  loginIconsContainer: {
    flexDirection: 'row',
    // height: 40,
    justifyContent: 'center',
    gap: 16,
  },
  loginIconImg: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});
