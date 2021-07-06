import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';
import propTypes from 'prop-types';
import {signUp} from '../action/auth';
import {connect} from 'react-redux';
import {Avatar, Text, Input} from 'react-native-elements';

const Signup = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phone_no, setphone_no] = useState('');
  const [shopName, setShopName] = useState('');
  const [ownerPic, setOwnerPic] = useState(
    'https://gbcaindia.com/images/user.png',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User Tapped Custom Button', response.customButton);
      } else {
        // const source = {uri: response.uri};
        console.log(response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    setImageUploading(true);

    const reference = storage().ref(response.fileName);

    const task = reference.putFile(response.path);
    task.on('state_changed', taskSnapshot => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;

      setUploadStatus(percentage);
    });
    task.then(async () => {
      const url = await reference.getDownloadURL();
      setOwnerPic(url);
      setImageUploading(false);
    });
  };

  const doSignup = async () => {
    signUp({
      name,
      email,
      password,
      address,
      city,
      state,
      country,
      phone_no,
      shopName,
      ownerPic,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Avatar rounded size="large" source={{uri: ownerPic}} />
            </TouchableOpacity>
          </View>

          {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )}

          <View style={styles.form}>
            <View style={styles.formItem}>
              <Input
                placeholder="Name"
                value={name}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="Email"
                value={email}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setPassword(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="Address"
                value={address}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setAddress(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="City"
                value={city}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setCity(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="State"
                value={state}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setState(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="Country"
                value={country}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setCountry(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="Phone Number"
                value={phone_no}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setphone_no(text)}
              />
            </View>
            <View style={styles.formItem}>
              <Input
                placeholder="Shop Name"
                value={shopName}
                style={{color: '#000', fontSize: 14}}
                onChangeText={text => setShopName(text)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={doSignup}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 5,
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
  form: {
    marginTop: '5%',
  },
});

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

Signup.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Signup);
