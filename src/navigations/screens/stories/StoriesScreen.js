import React from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  themeStyles,
  darkThemeStyles,
  lightThemeStyles,
} from '../../../styles/Styles';
import {changeTheme} from '../../../redux/actions/UtilsAction';
import {
  changeEmail,
  changePassword,
} from '../../../redux/actions/UserDetailsAction';
import Header from '../../../components/headers/Header';
import MyStory from '../../../components/stories/MyStory';
import AllStories from '../../../components/stories/AllStories';
import Community from '../../../components/stories/Comunity';
import BoxTitle from '../../../components/stories/BoxTitle';
const StoriesScreen = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <>
      <Header title="Stories" theme={props.utils.theme} {...props} />
      <ScrollView
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={[styles.fullScreen, styles.fullScreenBgClr]}>
        <MyStory theme={props.utils.theme} />
        <AllStories theme={props.utils.theme} />
        <BoxTitle title="Community Posts" theme={props.utils.theme} />
        <Community theme={props.utils.theme} />
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  state: state.auth,
  utils: state.utils,
  user: state.userData,
});
const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(changeTheme(theme)),
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StoriesScreen);
