import React from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {ListItem, Icon, Button, Left, Right, Body} from 'native-base';
import {Overlay} from 'react-native-elements';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import {showProfileEditModal} from '../../redux/actions/UtilsAction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const Modal = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  let modalType = props.utils.modalType;
  const handleClose = () => {
    props.showProfileEditModal(!props.utils.isModalOpen, '');
  };

  return (
    props.children && (
      <Overlay
        onBackdropPress={() =>
          props.showProfileEditModal(!props.utils.isModalOpen, '')
        }
        isVisible={props.utils.isModalOpen}
        windowBackgroundColor="rgba(0,0,0,0.3)"
        animationType="slide"
        borderRadius={32}
        overlayStyle={{
          top:
            modalType === 'editDetails'
              ? '10%'
              : modalType === 'changePswd'
              ? '20%'
              : modalType === 'selectPhoto'
              ? '60%'
              : '30%',
          width: '100%',
          elevation: 50,
        }}
        height="100%">
        <ListItem
          icon
          style={{
            paddingLeft: '10%',
            borderBottomWidth: 1,
            width: '100%',
            left: -18,
          }}>
          <Body>
            <Text style={{alignSelf: 'center', fontSize: 25, color: 'salmon'}}>
              {props.title}
            </Text>
          </Body>
          <Right>
            <Button
              large
              transparent
              style={{
                left: 20,
              }}
              onPress={() => handleClose()}>
              <Icon
                active
                name="close"
                type="SimpleLineIcons"
                style={{
                  color: 'gray',
                  elevation: 20,
                  backgroundColor: 'white',
                  borderRadius: 50,
                }}
              />
            </Button>
          </Right>
        </ListItem>

        {props.children}
      </Overlay>
    )
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  showProfileEditModal: (isModalOpen, modalType) =>
    dispatch(showProfileEditModal(isModalOpen, modalType)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
