import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ListItem, Button, Icon, Left, Right, Body, Switch} from 'native-base';
import {connect} from 'react-redux';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import {changeTheme} from '../../redux/actions/UtilsAction';
const Settings = (props) => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <ScrollView>
      <ListItem itemDivider>
        <Text>Prefrences</Text>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={[styles.darkModeBtnBgClr]}>
            <Icon
              active
              android="md-moon"
              ios="ios-moon"
              type="Ionicons"
              style={[styles.darkModeBtnTxtClr]}
            />
          </Button>
        </Left>
        <Body>
          <Text style={[styles.settingItemTxtClr]}>Dark Mode</Text>
        </Body>
        <Right>
          <Switch
            value={props.utils.theme === 'dark'}
            onValueChange={() => {
              if (props.utils.theme === 'light') {
                props.changeTheme('dark');
              } else {
                props.changeTheme('light');
              }
            }}
          />
        </Right>
      </ListItem>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  utils: state.utils,
});
const mapDispatchToProps = (dispatch) => ({
  changeTheme: (theme) => dispatch(changeTheme(theme)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
