import React from 'react';
import { Text } from 'react-native';
import { InputStyles } from '../../styles/styles';

const InputLabel = ({text}: {text: string}) =>
  <Text
    style={InputStyles.label}
  >
    {text}
  </Text>

export default InputLabel;