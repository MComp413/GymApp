import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = (props: {onPress: () => void, children: Element}) =>
  <TouchableOpacity
    onPress={props.onPress}
  >
    {props.children}
  </TouchableOpacity>

export default Button;