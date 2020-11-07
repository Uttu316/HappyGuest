import React from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import {
  showError,
  changeForm,
  changeAnimation,
} from '../../redux/actions/AuthAction';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import {Icon, Item, Input} from 'native-base';
import * as Animatable from 'react-native-animatable';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {setLoading, changeTheme} from '../../redux/actions/UtilsAction';
import {lightThemeValues, darkThemeValues} from '../../styles/StylesVar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

let AnimatableKView = Animatable.createAnimatableComponent(
  KeyboardAvoidingView,
);
let AnimatableInput = Animatable.createAnimatableComponent(Item);

const ForgetPassword = props => {
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');

  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  let theme =
    props.utils.theme === 'light' ? lightThemeValues : darkThemeValues;

  function handleSendOtp() {
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
        setTimeout(() => {
          if (finalEmail === '1234567890') {
            props.changeForm('verify-otp');
          } else {
            props.showError('credential', 'Number is not registered!');
          }
          props.setLoading(false);
        }, 3000);
      } else {
        props.showError('email', 'Enter 10 digit number!');
        props.setLoading(false);
      }
    } else if (!emailRegex.test(finalEmail)) {
      props.showError('email', 'Email is not valid!');
      props.setLoading(false);
    } else {
      setTimeout(() => {
        if (finalEmail === 'abc@gmail.com') {
          props.changeForm('verify-otp');
        } else {
          props.showError('credential', 'Email is not registered!');
        }
        props.setLoading(false);
      }, 3000);
    }
  }
  function handleResendOtp() {}
  function handleVerifyOtp() {
    props.showError('', '');
    props.setLoading(true);
    if (!otp) {
      props.showError('otp', 'Enter OTP');
      props.setLoading(false);
    } else if (otp.length !== 6) {
      props.showError('otp', 'OTP must be 6 digit!');
      props.setLoading(false);
    } else {
      setTimeout(() => {
        if (otp === '123456') {
          props.changeForm('reset-pswd');
        } else {
          props.showError('otpserver', 'OTP is not correct!');
          setOtp('');
        }
        props.setLoading(false);
      }, 3000);
    }
  }
  function handleResetPassword() {
    props.showError('', '');
    props.setLoading(true);
    if (newPassword.length < 8) {
      props.showError('reset', 'Password at least 8 character!');
      props.setLoading(false);
    } else if (newPassword !== rePassword) {
      props.showError('reset', 'Password does not match!');
      props.setLoading(false);
    } else {
      setTimeout(() => {
        if (true) {
          handleBack();
        } else {
          props.showError('resetserver', 'Not able to reset password!');
        }
        props.setLoading(false);
      }, 3000);
    }
  }
  function handleBack() {
    props.changeAnimation('zoomInLeft', 0);
    props.changeForm('login');
    props.showError('', '');
  }
  function handleBtnClick() {
    if (props.utils.isLoading) {
      return;
    } else if (props.state.currentForm === 'forget') {
      handleSendOtp();
    } else if (props.state.currentForm === 'verify-otp') {
      handleVerifyOtp();
    } else if (props.state.currentForm === 'reset-pswd') {
      handleResetPassword();
    }
  }
  function handleBtntext() {
    if (props.state.currentForm === 'forget') {
      if (props.utils.isLoading) {
        return 'Sending OTP...';
      }
      return 'Send OTP';
    } else if (props.state.currentForm === 'verify-otp') {
      if (props.utils.isLoading) {
        return 'Verifing OTP...';
      }
      return 'Verify OTP';
    } else if (props.state.currentForm === 'reset-pswd') {
      if (props.utils.isLoading) {
        return 'Saving...';
      }
      return 'Reset Password';
    }
  }
  React.useEffect(() => {
    const backAction = () => {
      handleBack();
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
      keyboardShouldPersistTaps="always"
      animation={'zoomInRight'}
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
          defaultValue={email}
          editable={props.state.currentForm === 'forget'}
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
      {props.state.currentForm === 'verify-otp' && (
        <OTPInputView
          style={styles.otpStyle}
          pinCount={6}
          code={otp}
          onCodeChanged={code => {
            setOtp(code);
            props.showError('', '');
          }}
          autoFocusOnLoad
          codeInputFieldStyle={[styles.otpBox, styles.textClr]}
          codeInputHighlightStyle={styles.otpBoxActiveBorder}
          onCodeFilled={code => {
            //doing nothing now
          }}
        />
      )}
      {props.state.currentForm === 'reset-pswd' && (
        <>
          <AnimatableInput
            animation="fadeIn"
            secureTextEntry
            rounded
            style={[styles.authInputItem, styles.bgColor]}>
            <Icon name="lock" style={styles.inputClr} />
            <Input
              placeholderTextColor={theme.inputColor}
              placeholder="New Password"
              style={styles.inputClr}
              onChangeText={text => {
                setNewPassword(text);
                props.showError('', '');
              }}
            />
          </AnimatableInput>
          <AnimatableInput
            animation="fadeIn"
            error={
              props.state.errorType === 'reset' ||
              props.state.errorType === 'resetserver'
            }
            secureTextEntry
            rounded
            style={[styles.authInputItem, styles.bgColor]}>
            <Icon name="lock" style={styles.inputClr} />
            <Input
              placeholderTextColor={theme.inputColor}
              placeholder="Confirm Password"
              style={styles.inputClr}
              onChangeText={text => {
                setRePassword(text);
                props.showError('', '');
              }}
            />
            {(props.state.errorType === 'reset' ||
              props.state.errorType === 'resetserver') && (
              <Icon active name="close-circle" color="red" />
            )}
          </AnimatableInput>
        </>
      )}

      {(props.state.errorType !== 'password' ||
        props.state.errorType !== 'credential') &&
        props.state.error !== '' && (
          <Animatable.Text animation="wobble" style={styles.authInputError}>
            {props.state.error}
          </Animatable.Text>
        )}
      <Button
        title={handleBtntext()}
        raised
        buttonStyle={styles.btnBgClr}
        titleStyle={styles.btnTextClr}
        onPress={() => handleBtnClick()}
      />
      {props.state.currentForm === 'verify-otp' && (
        <TouchableOpacity
          onPress={() => {
            props.utils.isLoading ? null : handleResendOtp();
          }}
          style={styles.authTextLink}>
          <Text style={styles.textClr}> Resend OTP</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          props.utils.isLoading ? null : handleBack();
        }}
        style={styles.authTextLink}>
        <Text style={styles.textClr}> Back</Text>
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
  changeAnimation: (animation, delay) =>
    dispatch(changeAnimation(animation, delay)),
  showError: (errorType, error) => dispatch(showError(errorType, error)),
  setLoading: isLoading => dispatch(setLoading(isLoading)),
  changeTheme: theme => dispatch(changeTheme(theme)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

/*KeyboardAvoiding Issue*/
