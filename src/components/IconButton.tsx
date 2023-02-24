import React from 'react';
import {IconSizes, IconProps} from './Icon';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

MIcon.loadFont();

MIcon.loadFont();

type IconButtonProps = IconProps & {
  text?: string;
  onPress: () => void;
};

export const IconButton = ({
  onPress,
  size,
  name,
  color,
}: IconButtonProps) => (
  <MIcon.Button
    onPress={onPress}
    name={name}
    size={IconSizes[size]}
    color={color}
    backgroundColor="white"
    style={{marginRight: 0}}
    ></MIcon.Button>
);
