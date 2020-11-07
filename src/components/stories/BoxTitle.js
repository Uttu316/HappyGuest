import React from 'react';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import {Text} from 'native-base';
const BoxTitle = props => {
  let styles =
    props.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  return (
    <Text style={[styles.myStoryTitle, styles.myStoryTitleClr]}>
      {props.title}
    </Text>
  );
};
export default BoxTitle;

/*Remove tochable from no story box*/
