import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import {Text, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {signIn} from '../action/auth';
import propTypes from 'prop-types';

const SignIn = ({navigation, signIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignIn = () => {
    signIn({email, password});
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text h4 style={styles.heading}>
          Welcome to the Memior
        </Text>

        <View>
          <View style={styles.formItem}>
            <Input
              placeholder="Enter Your Email"
              value={email}
              style={{color: '#fff'}}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.formItem}>
            <Input
              placeholder="Enter Your Password"
              value={password}
              secureTextEntry={true}
              style={{color: '#fff'}}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={doSignIn}>
            <Text style={styles.buttonText}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{marginTop: 10}}>
            <Text style={{color: '#53B175', textAlign: 'center'}}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    marginHorizontal: 5,
    marginTop: '20%',
    marginBottom: '10%',
  },
  formItem: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#53B175',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: '3%',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

const mapDispatchToProps = {
  signIn: data => signIn(data),
};

SignIn.propTypes = {
  signIn: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignIn);
