import React from 'react';
import { View, Text } from 'react-native';
import { Slider } from 'react-native-gesture-handler';

export default UdaciSlider = ({ max, unit, step, value, onChange }) => (
  <View>
   <Slider 
    value={value}
    maximumValue={max}
    step={step}
    onValueChange={onChange}
  />
  <View>
    <Text>{value}</Text>
    <Text>{unit}</Text>
  </View>
  </View>
);