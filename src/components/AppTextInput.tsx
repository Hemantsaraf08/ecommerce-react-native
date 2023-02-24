import React from 'react';
import {IconProps} from './Icon';
import { TextInput, StyleSheet, Text } from 'react-native';

export interface inputCompProps extends IconProps {
  label: string;
  inputType: 'text' | 'email' | 'password' | 'number';
  placeholder: string;
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

function AppTextInput({
  label,
  inputType = 'text',
  placeholder = '',
  size: iconSize,
  name: iconName,
  color: iconColor,
  value, 
  setValue
}: inputCompProps)  {
  return <>
  {label && <Text>{label}</Text>}
  <TextInput onChangeText={setValue} value={value} placeholder={placeholder} secureTextEntry={inputType === "password" ? true: false}/>
  {/* space for icons */}
  </>;
}

export default AppTextInput;
