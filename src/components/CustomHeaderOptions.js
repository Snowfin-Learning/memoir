import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeaderOptions = ({signOut, authState, navigation}) => {
  return (
    <View>
      {authState.isAuthenticated && (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
            <Icon name="cart-plus" size={40} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut()}>
            <Icon name="sign-out" size={40} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeaderOptions.prototype = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomHeaderOptions);
