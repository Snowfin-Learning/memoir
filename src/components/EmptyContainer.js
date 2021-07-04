import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

const EmptyContainer = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text>Wait for the app loads up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyContainer;
