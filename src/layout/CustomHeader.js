import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';

const CustomHeader = ({signOut, authState, navigation}) => {
  return <Text></Text>;
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeader.prototype = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
