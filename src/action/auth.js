import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

// SIGNUP METHOD

export const signUp = data => async dispatch => {
  console.log(data);

  const {
    name,
    email,
    password,
    address,
    city,
    state,
    country,
    phone_no,
    shop_name,
    photo,
  } = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);
      console.log('User successfully created');

      database()
        .ref('/users/' + data.user.uid)
        .set({
          name,
          email,
          password,
          address,
          city,
          state,
          country,
          phone_no,
          shop_name,
          photo,
          uid: data.user.uid,
        })
        .then(() => {
          console.log('Data set success');

          Snackbar.show({
            text: 'Account is created',
            textColor: 'white',
            backgroundColor: '#1b262c',
          });
        });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'Signup Failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

//SIGNIN METHOD

export const signIn = data => async dispatch => {
  console.log(data);

  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Signin Success');

      Snackbar.show({
        text: 'Account signined',
        textColor: 'white',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.error(error);

      Snackbar.show({
        text: 'Signin Failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

// SIGNOUT METHOD

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('Signout successful');
      Snackbar.show({
        text: 'Account signout',
        textColor: 'white',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      Snackbar.show({
        text: 'Signout Failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
