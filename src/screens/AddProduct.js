import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Snackbar from 'react-native-snackbar';
import ProgressBar from 'react-native-progress/Bar';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {optiion} from '../utils/options';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import shortId from 'shortid';

const AddProduct = ({navigation, userState}) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [price, setPrice] = useState('');
  const [productImage, setproductImage] = useState(null);

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
      setproductImage(url);
      setImageUploading(false);
    });
  };

  const addProduct = async () => {
    //
  };

  return (
    <>
      <Text>Hello from Add Product</Text>
    </>
  );
};

const mapStateToProps = state => ({
  userState: state.auth.user,
});

AddProduct.PropTYpes = {
  userState: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(AddProduct);
