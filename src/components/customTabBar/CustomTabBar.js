import React from 'react';
import {Icon, Badge} from 'native-base';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, Keyboard} from 'react-native';
import {
  themeStyles,
  darkThemeStyles,
  lightThemeStyles,
} from '../../styles/Styles';
import {lightThemeValues, darkThemeValues} from '../../styles/StylesVar';
import {changeScreen} from '../../redux/actions/UtilsAction';
import TabBarFAB from './TabBarFab';

function CustomTabBar(props) {
  const {state, descriptors, navigation} = props;

  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  let theme =
    props.utils.theme === 'light' ? lightThemeValues : darkThemeValues;
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <>
      {!isKeyboardVisible && (
        <View style={[styles.tabBar, styles.tabBarBgClr]}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
                if (index) {
                  props.changeScreen('Stories');
                } else {
                  props.changeScreen('Chats');
                }
              }
            };
            const icon = (
              <Icon
                name={label === 'Chats' ? 'paper-plane' : 'colours'}
                type="Entypo"
                style={{
                  color: isFocused
                    ? theme.tabBarIconActiveColor
                    : theme.tabBarIconInactiveColor,
                }}
              />
            );
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                activeOpacity={1}
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={
                  label === 'Chats'
                    ? [styles.tabItem, styles.tabBarBtnBorder]
                    : [styles.tabItem]
                }
                key={label}>
                {icon}
                {label === 'Chats' && (
                  <Badge danger style={styles.tabBarBadge} />
                )}
                <Text
                  style={
                    isFocused
                      ? styles.tabBarIconActiveClr
                      : styles.tabBarIconInactiveClr
                  }>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TabBarFAB />
        </View>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  changeScreen: screen => dispatch(changeScreen(screen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomTabBar);
