import React from 'react';
import {Icon, View} from 'native-base';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../../styles/Styles';
import {
  changeUserName,
  changeUserBio,
} from '../../../redux/actions/UserDetailsAction';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import {ScrollView} from 'react-native';

const EditProfile = props => {
  const [userName, setUserName] = React.useState('');
  const [userBio, setUserBio] = React.useState('');
  const [error, setError] = React.useState('');
  const [errorType, setErrorType] = React.useState('');
  const [btntext, setBtnText] = React.useState('SAVE');
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  function handleSave() {
    let finalUserName = userName.trim();
    if (!finalUserName) {
      setErrorType('userName');
      setError('User name can not be empty!');
    } else {
      setBtnText('SAVING...');
      axios
        .post(
          'http://10.0.2.2:3000/edit/user',
          {
            userId: props.userData.userId,
            user_name: finalUserName,
            bio: userBio,
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
              password: props.userData.password,
              email: props.userData.email,
              dob: props.userData.birthDate,
              phone: props.userData.phoneNumber,
              company: props.userData.company,
              current_address: props.userData.currentAddress,
              permanent_address: props.userData.permanentAddress,
              gender: props.userData.permanentAddress,
              profile_picture: props.userData.profilePicture,
              user_name: finalUserName,
              bio: userBio,
            };
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            props.changeUserName(finalUserName);
            props.changeUserBio(userBio);
            setBtnText('SAVED');
          } else {
            setBtnText('Request Failed');
          }
        })
        .catch(err => {
          setBtnText('Request Failed');
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    setUserName(props.userData.userName);
    setUserBio(props.userData.userBio);
  }, []);
  return (
    <>
      <ScrollView style={{paddingTop: 20}} showsVerticalScrollIndicator={false}>
        <Input
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 16,
            marginVertical: 10,
          }}
          label="User name"
          value={userName}
          onChangeText={text => {
            setUserName(text);
            setError('');
            setErrorType('');
            setBtnText('SAVE');
          }}
          placeholder="Enter user name"
          leftIcon={<Icon active name="person-outline" type="MaterialIcons" />}
        />
        {errorType === 'userName' && (
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
        <Input
          rightIconContainerStyle={{backgroundColor: 'red'}}
          rightIcon={errorType === 'userBio' && <Icon active name="close" />}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 16,
            marginVertical: 10,
          }}
          label="Bio"
          value={userBio}
          onChangeText={text => {
            setUserBio(text);
            setError('');
            setErrorType('');
            setBtnText('SAVE');
          }}
          placeholder="Enter bio"
          leftIcon={
            <Icon name="bag-personal-outline" type="MaterialCommunityIcons" />
          }
        />
        {error !== '' && (
          <Animatable.Text animation="wobble" style={styles.authInputError}>
            {error}
          </Animatable.Text>
        )}

        <Button
          disabled={btntext === 'SAVING...'}
          title={btntext}
          raised
          buttonStyle={{
            backgroundColor:
              btntext === 'SAVE'
                ? '#2089dc'
                : btntext === 'Request Failed'
                ? 'red'
                : 'lightgreen',
          }}
          onPress={() => handleSave()}
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
  changeUserName: userName => dispatch(changeUserName(userName)),
  changeUserBio: userBio => dispatch(changeUserBio(userBio)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);
