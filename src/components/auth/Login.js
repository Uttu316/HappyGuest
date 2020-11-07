import React from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from 'react-native';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import axios from 'axios';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import {Icon, Item, Input} from 'native-base';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import {changeForm, showError} from '../../redux/actions/AuthAction';
import {
  setLoading,
  changeTheme,
  setToken,
} from '../../redux/actions/UtilsAction';
import {
  setUserId,
  changeEmail,
  changePassword,
  changeBirthData,
  changeGender,
  changeCompany,
  changePhoneNumber,
  changeAddress,
  changeUserBio,
  changeUserName,
} from '../../redux/actions/UserDetailsAction';
import {lightThemeValues, darkThemeValues} from '../../styles/StylesVar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
let AnimatableKView = Animatable.createAnimatableComponent(
  KeyboardAvoidingView,
);

const Login = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  let theme =
    props.utils.theme === 'light' ? lightThemeValues : darkThemeValues;

  function sendCredential(email, password, isNumber) {
    axios
      .post(
        'http://10.0.2.2:3000/signin',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async function(response) {
        const token = response.data.token;
        const userData = response.data.user;
        try {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          props.setToken(token);

          props.setLoading(false);
          setEmail('');
          setPassword('');
          props.changeEmail(userData.email);
          props.changePassword(userData.password);

          props.changeAddress(
            userData.current_address,
            userData.permanent_address,
          );
          props.setUserId(userData.userId);
          props.changePhoneNumber(userData.phone);
          props.changeUserName(userData.user_name);
          props.changeGender(userData.gender);
          props.changeUserBio(userData.bio);
          props.changeBirthData(userData.dob);
          props.changeCompany(userData.company);
          props.navigation.navigate('drawer', {
            screen: 'main',
          });
        } catch (error) {
          /*--------Dummy--------------*/
          const token = 'response.data.token';
          const userData = {
            userId: 'sdsdsdsd',
            email: email,
            password: password,
            phone: '0987654321',
            user_name: 'Dhone Kholi',
            dob: '12-08-1998',
            gender: 'male',
            current_address: 'sdsdsdsd',
            permanent_address: 'sdsdsddsds',
            profile_picture: '',
            bio: 'edsdsdsd',
            company: 'dsdsd',
          };
          try {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            props.setToken(token);

            props.setLoading(false);
            setEmail('');
            setPassword('');
            props.changeEmail(userData.email);
            props.changePassword(userData.password);

            props.changeAddress(
              userData.current_address,
              userData.permanent_address,
            );
            props.setUserId(userData.userId);
            props.changePhoneNumber(userData.phone);
            props.changeUserName(userData.user_name);
            props.changeGender(userData.gender);
            props.changeUserBio(userData.bio);
            props.changeBirthData(userData.dob);
            props.changeCompany(userData.company);
            props.navigation.navigate('drawer', {
              screen: 'main',
            });
          } finally {
            null;
          }
          /*---------------Dummy---------*/
          if (isNumber) {
            props.showError(
              'credential',
              'Phone number or Password is not matching!',
            );
          } else {
            props.showError('credential', 'Email or Password is not matching!');
          }
          props.setLoading(false);
        }
      })
      .catch(async function(error) {
        /*--------Dummy--------------*/
        const token = 'response.data.token';
        const userData = {
          userId: 'sdsdsdsd',
          email: email,
          password: password,
          phone: '0987654321',
          user_name: 'Dhone Kholi',
          dob: '12-08-1998',
          gender: 'male',
          current_address: 'sdsdsdsd',
          permanent_address: 'sdsdsddsds',
          profile_picture: '',
          bio: 'edsdsdsd',
          company: 'dsdsd',
        };
        try {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          props.setToken(token);

          props.setLoading(false);
          setEmail('');
          setPassword('');
          props.changeEmail(userData.email);
          props.changePassword(userData.password);

          props.changeAddress(
            userData.current_address,
            userData.permanent_address,
          );
          props.setUserId(userData.userId);
          props.changePhoneNumber(userData.phone);
          props.changeUserName(userData.user_name);
          props.changeGender(userData.gender);
          props.changeUserBio(userData.bio);
          props.changeBirthData(userData.dob);
          props.changeCompany(userData.company);
          props.navigation.navigate('drawer', {
            screen: 'main',
          });
        } finally {
          null;
        }
        /*---------------Dummy---------*/
        isNumber
          ? props.showError(
              'credential',
              'Phone number or Password is not matching!',
            )
          : props.showError('credential', 'Email or Password is not matching!');
        props.setLoading(false);
      });
  }

  function handleSignin() {
    let finalEmail = email.toLowerCase().trim();
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneRegex = /^\d{10}$/;
    let onlynumRegex = /^[0-9]+$/;

    props.showError('', '');
    props.setLoading(true);

    if (!finalEmail) {
      props.showError('email', 'Please enter phone number or email!');
      props.setLoading(false);
    } else if (onlynumRegex.test(finalEmail)) {
      if (phoneRegex.test(finalEmail) === true) {
        if (password.length < 8) {
          props.showError('password', 'Password at least 8 character!');
          props.setLoading(false);
        } else {
          sendCredential(finalEmail, password, true);
        }
      } else {
        props.showError('email', 'Enter 10 digit number!');
        props.setLoading(false);
      }
    } else if (!emailRegex.test(finalEmail)) {
      props.showError('email', 'Email is not valid!');
      props.setLoading(false);
    } else if (password.length < 8) {
      props.showError('password', 'Password at least 8 character!');
      props.setLoading(false);
    } else {
      sendCredential(finalEmail, password, false);
    }
  }

  function handleForget() {
    props.showError('', '');

    props.changeForm('forget');
  }
  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <AnimatableKView
      enableOnAndroid={true}
      extraHeight={0}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      animation={props.state.animation}
      delay={props.state.delay}
      style={styles.parentWidth}>
      <Item
        error={
          props.state.errorType === 'email' ||
          props.state.errorType === 'credential'
        }
        rounded
        style={[styles.authInputItem, styles.bgColor]}>
        <Icon name="person" style={styles.inputClr} />
        <Input
          editable={!props.utils.isLoading}
          defaultValue={email}
          placeholderTextColor={theme.inputColor}
          placeholder="Email/Phone number"
          style={styles.inputClr}
          onChangeText={text => {
            setEmail(text);
            props.showError('', '');
          }}
        />
        {(props.state.errorType === 'email' ||
          props.state.errorType === 'credential') && (
          <Icon active name="close-circle" color="red" />
        )}
      </Item>

      <Item
        error={
          props.state.errorType === 'password' ||
          props.state.errorType === 'credential'
        }
        rounded
        style={[styles.authInputItem, styles.bgColor]}>
        <Icon name="lock" style={styles.inputClr} />
        <Input
          editable={!props.utils.isLoading}
          defaultValue={password}
          secureTextEntry
          placeholderTextColor={theme.inputColor}
          placeholder="Password"
          style={styles.inputClr}
          onChangeText={text => {
            setPassword(text);
            props.showError('', '');
          }}
        />
        {(props.state.errorType === 'password' ||
          props.state.errorType === 'credential') && (
          <Icon active name="close-circle" color="red" />
        )}
      </Item>
      {(props.state.errorType === 'password' ||
        props.state.errorType === 'credential' ||
        props.state.errorType === 'email') && (
        <Animatable.Text animation="wobble" style={styles.authInputError}>
          {props.state.error}
        </Animatable.Text>
      )}
      <Button
        title={props.utils.isLoading ? 'Signing...' : 'Sign in'}
        raised
        buttonStyle={styles.btnBgClr}
        titleStyle={styles.btnTextClr}
        onPress={() => {
          props.utils.isLoading ? null : handleSignin();
        }}
      />

      <TouchableOpacity
        onPress={() => (props.utils.isLoading ? null : handleForget())}
        style={styles.authTextLink}>
        <Text style={styles.textClr}>Forget Password?</Text>
      </TouchableOpacity>
    </AnimatableKView>
  );
};
const mapStateToProps = state => ({
  state: state.auth,
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  changeForm: currentForm => dispatch(changeForm(currentForm)),
  showError: (errorType, error) => dispatch(showError(errorType, error)),
  setLoading: isLoading => dispatch(setLoading(isLoading)),
  changeTheme: theme => dispatch(changeTheme(theme)),
  setToken: token => dispatch(setToken(token)),
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
  changeBirthData: dob => dispatch(changeBirthData(dob)),
  changePhoneNumber: phoneNumber => dispatch(changePhoneNumber(phoneNumber)),
  changeGender: gender => dispatch(changeGender(gender)),
  changeAddress: (currAddress, permanentAddress) =>
    dispatch(changeAddress(currAddress, permanentAddress)),
  changeUserBio: bio => dispatch(changeUserBio(bio)),
  changeCompany: company => dispatch(changeCompany(company)),
  changeUserName: name => dispatch(changeUserName(name)),
  setUserId: userId => dispatch(setUserId(userId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
