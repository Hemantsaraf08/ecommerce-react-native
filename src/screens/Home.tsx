import React, {useContext} from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import {sharedStyle} from '../styles/shared';
import { AuthContext } from '../utils/AuthUtils';
import EncryptedStorage from 'react-native-encrypted-storage';

function Home() {
    const {dispatch, authState} =  useContext(AuthContext);

    const handleLogout = () =>{
        async function clearStorage() {
            try {
                await EncryptedStorage.clear();
            } catch (error) {
                console.error(error);
            }
        }
        clearStorage();
        dispatch({
            type: "sign_out"
        })
    }
    
  return (
    <View style={[sharedStyle.center, sharedStyle.flex]}>
      <Image source={{uri: authState.image}} style={{width: 100, height: 100}}/>  
      <Text style={styles.bigText}>Welcome Hemant!</Text>
      <Text style={styles.bigText}>{authState.image}</Text>
      <Button title='Log out' onPress={handleLogout}/>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
    bigText: {
        fontSize: 30,
        fontFamily: 'Mulish-SemiBold',
        marginBottom: 30
    }
})