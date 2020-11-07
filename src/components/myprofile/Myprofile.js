import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Card, Icon, Thumbnail} from 'native-base';
import {ListItem, Button} from 'react-native-elements';
import Modal from './Modal';
import EditProfile from './editForms/EditProfile';
import EditDetails from './editForms/EditDetails';
import ChangePassword from './editForms/ChangePassword';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import {showProfileEditModal} from '../../redux/actions/UtilsAction';
import DummyImage from '../../assets/Dummy-Person.png';
const MyProfile = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={[styles.profileCard, styles.profileCardBgClr]}>
          <View style={styles.profileImage}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile-image')}>
              {props.userData.profilePicture !== '' &&
              props.userData.profilePicture !== null ? (
                <Thumbnail
                  large
                  source={{
                    uri: props.userData.profilePicture,
                  }}
                />
              ) : (
                <Thumbnail large source={DummyImage} />
              )}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: 40,
                  opacity: 0.7,
                  backgroundColor: 'lightgrey',
                  borderBottomLeftRadius: 150,
                  borderBottomRightRadius: 150,
                  paddingTop: 5,
                  alignItems: 'center',
                }}>
                <Icon
                  name="eye"
                  type="SimpleLineIcons"
                  style={[styles.profileTxtClr, styles.editIcon]}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.profileEditIcon}
            onPress={() =>
              props.showProfileEditModal(!props.utils.isModalOpen, 'editName')
            }>
            <Icon
              name="pencil"
              type="SimpleLineIcons"
              style={[styles.profileTxtClr, styles.editIcon]}
            />
          </TouchableOpacity>
          <Text style={[styles.profileName, styles.headerTitleClr]}>
            {props.userData.userName}
          </Text>
          <Text style={[styles.profileBio, styles.profileSubTxtClr]}>
            {props.userData.userBio !== ''
              ? props.userData.userBio
              : 'Update Bio'}
          </Text>
        </Card>
        <Card style={[styles.profileDetailsCard, styles.profileCardBgClr]}>
          <TouchableOpacity
            style={styles.detailsEditIcon}
            onPress={() =>
              props.showProfileEditModal(
                !props.utils.isModalOpen,
                'editDetails',
              )
            }>
            <Icon
              name="pencil"
              type="SimpleLineIcons"
              style={[styles.profileTxtClr, styles.editIcon]}
            />
          </TouchableOpacity>
          <ListItem
            titleStyle={[styles.profileTxtClr]}
            title={'Email'}
            subtitle={props.userData.email}
            leftIcon={() => <Icon name="envelope" type="SimpleLineIcons" />}
            bottomDivider
          />
          <ListItem
            titleStyle={[styles.profileTxtClr]}
            title={'Phone'}
            subtitle={props.userData.phoneNumber}
            leftIcon={() => <Icon name="phone" type="SimpleLineIcons" />}
            bottomDivider
          />
          <ListItem
            titleStyle={[styles.profileTxtClr]}
            title={'D.O.B'}
            subtitle={'12 Aug 1998'}
            leftIcon={() => <Icon name="calendar" type="SimpleLineIcons" />}
            bottomDivider
          />
          {props.userData.gender === 'male' && (
            <ListItem
              titleStyle={[styles.profileTxtClr]}
              title={'Gender'}
              subtitle={'Male'}
              leftIcon={() => (
                <Icon name="symbol-male" type="SimpleLineIcons" />
              )}
              bottomDivider
            />
          )}
          {props.userData.gender === 'female' && (
            <ListItem
              titleStyle={[styles.profileTxtClr]}
              title={'Gender'}
              subtitle={'Female'}
              leftIcon={() => (
                <Icon name="symbol-female" type="SimpleLineIcons" />
              )}
              bottomDivider
            />
          )}
          {props.userData.gender === 'notspecified' && (
            <ListItem
              titleStyle={[styles.profileTxtClr]}
              title={'Gender'}
              subtitle={'Not Specified'}
              leftIcon={() => (
                <Icon name="transgender-alt" type="FontAwesome" />
              )}
              bottomDivider
            />
          )}
          <ListItem
            titleStyle={[styles.profileTxtClr]}
            title={'Works At'}
            subtitle={props.userData.company}
            leftIcon={() => <Icon name="briefcase" type="SimpleLineIcons" />}
            bottomDivider
          />
          <ListItem
            titleStyle={[styles.profileTxtClr]}
            title={'Current Address'}
            subtitle={props.userData.currentAddress}
            leftIcon={() => <Icon name="location-pin" type="SimpleLineIcons" />}
            bottomDivider
          />
          <ListItem
            containerStyle={{
              borderBottomStartRadius: 20,
              borderBottomEndRadius: 20,
            }}
            titleStyle={[styles.profileTxtClr]}
            title={'Permanent Address'}
            subtitle={props.userData.permanentAddress}
            leftIcon={() => <Icon name="location-city" type="MaterialIcons" />}
            bottomDivider
          />
        </Card>

        <Button
          onPress={() =>
            props.showProfileEditModal(!props.utils.isModalOpen, 'changePswd')
          }
          title={'Change Password'}
          raised
          containerStyle={styles.resetPasswrdBtn}
        />
      </ScrollView>
      {props.utils.modalType === 'editName' && (
        <Modal title="Edit Profile" children={<EditProfile />} />
      )}
      {props.utils.modalType === 'editDetails' && (
        <Modal title="Edit Details" children={<EditDetails />} />
      )}
      {props.utils.modalType === 'changePswd' && (
        <Modal title="Change Password" children={<ChangePassword />} />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
  userData: state.userData,
});
const mapDispatchToProps = dispatch => ({
  showProfileEditModal: (isModalOpen, modalType) =>
    dispatch(showProfileEditModal(isModalOpen, modalType)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProfile);
