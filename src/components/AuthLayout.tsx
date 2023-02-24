import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {sharedStyle} from '../styles/shared';
import {useNavigation, useRoute} from '@react-navigation/native';

function AuthLayout() {
  const navigation = useNavigation();
  const route = useRoute();
  const currentScreen = route.name;

  return (
    <View style={[sharedStyle.fullWidth]}>
      <View style={[styles.logoContainer, styles.boxShadow]}>
        <View
          style={[
            sharedStyle.center,
            {padding: 35, backgroundColor: '#E02D1D'},
          ]}>
          <Image
            style={styles.Logo}
            source={require('../assets/images/app_logo.png')}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[
                styles.btnText,
                {color: '#FFAD9D'},
              ]}>
              Sign Up
            </Text>
            {currentScreen === 'SignUp' && (
              <View
                style={[styles.blueLine, {backgroundColor: '#FFAD9D'}]}></View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={[
                styles.btnText,
                {color: '#FFAD9D'},
              ]}>
              Sign In
            </Text>
            {currentScreen === 'SignIn' && (
              <View
                style={[styles.blueLine, {backgroundColor: '#FFAD9D'}]}></View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AuthLayout;

const styles = StyleSheet.create({
  Logo: {
    width: 140,
    height: 140,
  },
  logoContainer: {
    backgroundColor: '#E02D1D',
    width: '100%',
    padding: 16,
    paddingBottom: 0,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  btnContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '50%',
    // backgroundColor: 'pink',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  btnText: {
    fontFamily: 'Mulish-SemiBold',
    fontSize: 20,
    color: '#565D6D',
    // fontWeight: '700'
  },
  blueLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 8,
  },
});

const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');
