import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

type modalProps = {
    show: boolean,
    onRetry: ()=>void,
    isRetrying: boolean
}

function NoInternetModal({show, onRetry, isRetrying} : modalProps) {
  return (
    <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
        <Button onPress={onRetry} disabled={isRetrying}>
          Try Again
        </Button>
      </View>
    </Modal>
  );
}

type btnProp = React.PropsWithChildren<{onPress: ()=>void, disabled: boolean}>;

const Button = ({children, ...props}: btnProp) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Mulish-SemiBold',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Mulish-Regular',
  },
  button: {
    backgroundColor: '#67AAF9FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Mulish-Regular',
  },
});

export default NoInternetModal;
