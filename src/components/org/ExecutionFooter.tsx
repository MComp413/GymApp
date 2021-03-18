import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { TabNavRoutes } from '../../constants/constants';
import { actionBuilders } from '../../reducer/actions';
import { FlexStyles, FooterStyles } from '../../styles/styles';

export const ExecutionFooter = (props: {navigation: any}) => {
  const {navigation} = props;
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  return(
    <View
      style={{...FlexStyles.rowView, ...FooterStyles.executionFooter}}
    >
      <View
        style={{...FlexStyles.columnView}}
      >
        <Text style={FooterStyles.timer}>
          {time}
        </Text>
      </View>
      <View
        style={{...FlexStyles.columnView}}
      >
        <Button
          title="Finish"
          onPress={() => {
            dispatch(actionBuilders.execution.FINISH_TRAINING());
            navigation.navigate(TabNavRoutes.LIST);
          }}
        />
      </View>
    </View>
  )

}