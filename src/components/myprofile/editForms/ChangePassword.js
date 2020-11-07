import React from 'react';
import {Icon, View} from 'native-base';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../../styles/Styles';
import {changePassword} from '../../../redux/actions/UserDetailsAction';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import {ScrollView} from 'react-native';

const ChangePassword = props => {
  const [currentPassword, setCurrPassword] = React.useState('');
  const [newpassword, setNewPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [errorType, setErrorType] = React.useState('');
  const [btntext, setBtnText] = React.useState('SAVE');
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  function handleSave() {
    if (!currentPassword) {
      setErrorType('currpassword');
      setError('Current password can not empty!');
      setCurrPassword('');
      setRePassword('');
      setNewPassword('');
      return;
    } else if (!rePassword || !newpassword) {
      setErrorType('newpassword');
      setError('Field required!');

      setRePassword('');
      setNewPassword('');
      return;
    } else if (rePassword !== newpassword) {
      setErrorType('newpassword');
      setError('New password not matched!');
      setRePassword('');
      setNewPassword('');
      return;
    } else {
      setBtnText('SAVING...');
      axios
        .post(
          'http://10.0.2.2:3000/edit/password',
          {
            userId: props.userData.userId,
            current_password: currentPassword,
            new_password: newpassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async res => {
          if (res.data.success) {
            const userData = {
              userId: props.userData.userId,
              password: res.data.data.password,
              email: props.userData.email,
              dob: props.userData.birthDate,
              phone: props.userData.phoneNumber,
              company: props.userData.company,
              current_address: props.userData.currentAddress,
              permanent_address: props.userData.permanentAddress,
              gender: props.userData.permanentAddress,
              profile_picture: props.userData.profilePicture,
              user_name: props.userData.userName,
              bio: props.userData.userBio,
            };
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            props.changePassword(res.data.data.password);
            setBtnText('SAVED');
            setCurrPassword('');
            setRePassword('');
            setNewPassword('');
          } else {
            if (res.data.data.message.indexOf('current') !== -1) {
              setErrorType('currpassword');
              setError('Current password is not correct!');
            }
            setBtnText('Request Failed');
            setCurrPassword('');
            setRePassword('');
            setNewPassword('');
          }
        })
        .catch(err => {
          setBtnText('Request Failed');
          console.log(err);
          setCurrPassword('');
          setRePassword('');
          setNewPassword('');
        });
    }
  }

  return (
    <>
      <ScrollView style={{paddingTop: 20}} showsVerticalScrollIndicator={false}>
        <View>
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 16,
              marginVertical: 10,
            }}
            secureTextEntry={true}
            label="Current password"
            value={currentPassword}
            onChangeText={text => {
              setCurrPassword(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            placeholder="Enter current password"
            leftIcon={
              <Icon active name="person-outline" type="MaterialIcons" />
            }
          />
          {errorType === 'currpassword' && (
            <Icon
              active
              name="close-circle"
              type="MaterialCommunityIcons"
              style={{
                position: 'absolute',
                right: 14,
                top: 45,
                color: 'red',
                fontSize: 22,
              }}
            />
          )}
        </View>
        <View>
          <Input
            secureTextEntry={true}
            rightIconContainerStyle={{backgroundColor: 'red'}}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 16,
              marginVertical: 10,
            }}
            label="New Password"
            value={newpassword}
            onChangeText={text => {
              setNewPassword(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            placeholder="Enter new Password"
            leftIcon={
              <Icon name="lock-outline" type="MaterialCommunityIcons" />
            }
          />
          {errorType === 'newpassword' && (
            <Icon
              active
              name="close-circle"
              type="MaterialCommunityIcons"
              style={{
                position: 'absolute',
                right: 14,
                top: 45,
                color: 'red',
                fontSize: 22,
              }}
            />
          )}
        </View>
        <View>
          <Input
            secureTextEntry={true}
            rightIconContainerStyle={{backgroundColor: 'red'}}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 16,
              marginVertical: 10,
            }}
            label="Re enter Password"
            value={rePassword}
            onChangeText={text => {
              setRePassword(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            placeholder="Re enter new password"
            leftIcon={
              <Icon name="lock-outline" type="MaterialCommunityIcons" />
            }
          />
          {errorType === 'newpassword' && (
            <Icon
              active
              name="close-circle"
              type="MaterialCommunityIcons"
              style={{
                position: 'absolute',
                right: 14,
                top: 45,
                color: 'red',
                fontSize: 22,
              }}
            />
          )}
        </View>
        {error !== '' && (
          <Animatable.Text animation="wobble" style={styles.authInputError}>
            {error}
          </Animatable.Text>
        )}

        <Button
          disabled={btntext === 'SAVING...'}
          title={btntext}
          raised
          onPress={handleSave}
          buttonStyle={{
            backgroundColor:
              btntext === 'SAVE'
                ? '#2089dc'
                : btntext === 'Request Failed'
                ? 'red'
                : 'lightgreen',
            marginVertical: 10,
          }}
        />
      </ScrollView>
    </>
  );
};
const mapStateToProps = state => ({
  userData: state.userData,
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  changePassword: password => dispatch(changePassword(password)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
