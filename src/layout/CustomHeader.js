import React from 'react';
import {View} from 'react-native';
import {Header} from 'react-native-elements';
import CustomOptions from '../components/CustomHeaderOptions';

const CustomHeader = () => {
  return (
    <View>
      <Header
        backgroundColor="#53B175"
        placement="left"
        leftComponent={{text: 'Memior', style: {color: '#fff', fontSize: 25}}}
        rightComponent={<CustomOptions />}
      />
    </View>
  );
};

export default CustomHeader;
