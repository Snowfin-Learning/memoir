import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';
import {View, Text, StyleSheet} from 'react-native';
// import {} from 'react-native-vector-icons/dist/FontAwesome';

const CustomHeader = ({signOut, authState, navigation}) => {
  return (
    <>
      <View style={styles.Container}>
        <View>
          <Text>Memior Shop Owner</Text>
        </View>
        {authState.isAuthenticated && (
          <View>
            <View onPress={() => navigation.navigate('AddProduct')}>
              <Text>Add Product</Text>
            </View>
            <View onPress={() => signOut()}>
              <Text>Signout</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: 30,
    backgroundColor: '#53B175',
    color: 'white',
  },
});

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
