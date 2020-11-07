import React from 'react';
import {Icon, View, Text} from 'native-base';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../../styles/Styles';
import {
  changeAddress,
  changeBirthData,
  changeEmail,
  changeCompany,
  changeGender,
  changePhoneNumber,
} from '../../../redux/actions/UserDetailsAction';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const EditDetails = props => {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [dob, setDOB] = React.useState(new Date());
  const [showCalendar, toggleCalendar] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [currentAddress, setCurrAddress] = React.useState('');
  const [permanentAddress, SetPermanentAddress] = React.useState('');
  const [error, setError] = React.useState('');
  const [errorType, setErrorType] = React.useState('');
  const [btntext, setBtnText] = React.useState('SAVE');
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  function handleSave() {
    let userEmail = email.toLowerCase().trim();
    let userCurrAddress = currentAddress.trim();
    let userPermanentAddress = permanentAddress.trim();
    let userCompany = company.trim();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneRegex = /^\d{10}$/;

    if (!userEmail) {
      setErrorType('email');
      setError('User email can not be empty!');
    } else if (!emailRegex.test(userEmail)) {
      setErrorType('email');
      setError('User email is not valid!');
    } else if (!phone) {
      setErrorType('phone');
      setError('User phone can not empty!');
    } else if (!phoneRegex.test(phone)) {
      setErrorType('phone');
      setError('User phone is not valid!');
    } else if (!userCompany) {
      setErrorType('company');
      setError('User company can not be empty!');
    } else if (!userCurrAddress) {
      setErrorType('currAddress');
      setError('User current address can not be empty!');
    } else if (!userPermanentAddress) {
      setErrorType('permanentAddress');
      setError('User permanent address can not be empty!');
    } else {
      setBtnText('SAVING...');

      axios
        .post(
          'http://10.0.2.2:3000/edit/user',
          {
            userId: props.userData.userId,
            email: userEmail,
            dob: dob,
            phone: phone,
            company: userCompany,
            current_address: userCurrAddress,
            permanent_address: userPermanentAddress,
            gender: gender,
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
              user_name: props.userData.userName,
              bio: props.userData.userBio,
              email: userEmail,
              password: props.userData.password,
              phone: phone,
              dob: props.userData.dob, //still pending
              profile_picture: props.userData.profilePicture,
              gender: gender,
              company: userCompany,
              current_address: userCurrAddress,
              permanent_address: userPermanentAddress,
            };
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            props.changeEmail(userEmail);
            props.changePhoneNumber(phone);
            props.changeCompany(userCompany);
            props.changeAddress(userCurrAddress, userPermanentAddress);
            props.changeGender(gender);
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
    setEmail(props.userData.email);
    setPhone(props.userData.phoneNumber);
    setDOB(props.userData.birthDate);
    setGender(props.userData.gender);
    setCompany(props.userData.company);
    setCurrAddress(props.userData.currentAddress);
    SetPermanentAddress(props.userData.permanentAddress);
  }, []);
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
            label="User Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            textContentType="emailAddress"
            placeholder="Enter your email"
            leftIcon={
              <Icon active name="email-outline" type="MaterialCommunityIcons" />
            }
          />
          {errorType === 'email' && (
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
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 16,
              marginVertical: 10,
            }}
            label="User Phone"
            value={phone}
            onChangeText={text => {
              setPhone(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            placeholder="Enter your phone number"
            leftIcon={
              <Icon active name="phone-outline" type="MaterialCommunityIcons" />
            }
          />
          {errorType === 'phone' && (
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
        <View style={{padding: 10}}>
          <Text style={{color: 'gray', fontWeight: 'bold', marginBottom: 5}}>
            User Gender
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                setGender('male');
                setError('');
                setErrorType('');
                setBtnText('SAVE');
              }}>
              <View
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  borderWidth: 4,
                  borderRadius: 50,
                  borderColor: 'lightgrey',
                  height: 20,
                  width: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {gender === 'male' && (
                  <View
                    style={{
                      borderWidth: 4,
                      borderColor: 'black',
                      borderRadius: 50,
                      width: 5,
                      height: 5,
                    }}
                  />
                )}
              </View>
              <Icon
                name="human-male"
                type="MaterialCommunityIcons"
                style={{marginHorizontal: 15, marginTop: 5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                setGender('female');
                setError('');
                setErrorType('');
                setBtnText('SAVE');
              }}>
              <View
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  borderWidth: 4,
                  borderRadius: 50,
                  borderColor: 'lightgrey',
                  height: 20,
                  width: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {gender === 'female' && (
                  <View
                    style={{
                      borderWidth: 4,
                      borderColor: 'black',
                      borderRadius: 50,
                      width: 5,
                      height: 5,
                    }}
                  />
                )}
              </View>
              <Icon
                name="human-female"
                type="MaterialCommunityIcons"
                style={{marginHorizontal: 15, marginTop: 5}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                setGender('notspecified');
                setError('');
                setErrorType('');
                setBtnText('SAVE');
              }}>
              <View
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  borderWidth: 4,
                  borderRadius: 50,
                  borderColor: 'lightgrey',
                  height: 20,
                  width: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {gender === 'notspecified' && (
                  <View
                    style={{
                      borderWidth: 4,
                      borderColor: 'black',
                      borderRadius: 50,
                      width: 5,
                      height: 5,
                    }}
                  />
                )}
              </View>
              <Text style={{marginHorizontal: 15, marginTop: 8}}>
                Not Specifed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 16,
              marginVertical: 10,
            }}
            label="User Company"
            value={company}
            onChangeText={text => {
              setCompany(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            placeholder="Enter your company name"
            leftIcon={
              <Icon
                active
                name="briefcase-outline"
                type="MaterialCommunityIcons"
              />
            }
          />
          {errorType === 'company' && (
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
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 16,
              marginVertical: 10,
            }}
            label="User Address 1"
            value={currentAddress}
            onChangeText={text => {
              setCurrAddress(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            placeholder="Enter your current Address"
            leftIcon={
              <Icon active android="md-pin" ios="ios-pin" type="Ionicons" />
            }
          />
          {errorType === 'currAddress' && (
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
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 16,
              marginVertical: 10,
            }}
            label="User Address 2"
            value={permanentAddress}
            onChangeText={text => {
              SetPermanentAddress(text);
              setError('');
              setErrorType('');
              setBtnText('SAVE');
            }}
            placeholder="Enter your permanent address"
            leftIcon={
              <Icon
                active
                name="home-city-outline"
                type="MaterialCommunityIcons"
              />
            }
          />
          {errorType === 'permanentAddress' && (
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
        <View style={{height: 70}} />
      </ScrollView>
    </>
  );
};
const mapStateToProps = state => ({
  userData: state.userData,
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  changePhoneNumber: phone => dispatch(changePhoneNumber(phone)),
  changeGender: gender => dispatch(changeGender(gender)),
  changeAddress: (currentAddress, permanentAddress) =>
    dispatch(changeAddress(currentAddress, permanentAddress)),
  changeEmail: email => dispatch(changeEmail(email)),
  changeCompany: company => dispatch(changeCompany(company)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDetails);
