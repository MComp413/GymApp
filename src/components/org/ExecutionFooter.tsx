import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { TabNavRoutes } from '../../constants/constants';
import { actionBuilders } from '../../reducer/actions';

export const ExecutionFooter = (props: {navigation: any}) => {
  const {navigation} = props;
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  return(
    <View>
      <View>
        <Text> {time} </Text>
      </View>
      <View>
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