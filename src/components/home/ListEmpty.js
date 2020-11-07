import React from 'react';
import {Text, Icon} from 'native-base';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import * as Animatable from 'react-native-animatable';
const ListEmpty = props => {
  let styles =
    props.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  return (
    <Animatable.View animation="fadeIn" style={styles.listEmptyBox}>
      <Icon
        name="message-alert"
        type="MaterialCommunityIcons"
        style={[styles.listEmptyIcon, styles.listEmptytxtClr]}
      />
      <Text style={[styles.listEmptytxt, styles.listEmptytxtClr]}>
        You don't have any chat
      </Text>
      <Text style={[styles.listEmptytxt, styles.listEmptytxtClr]}>
        Click + button to send a new message
      </Text>
    </Animatable.View>
  );
};
export default ListEmpty;

/*Fix landscape view */
