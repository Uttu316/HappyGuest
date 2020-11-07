import React from 'react';
import {TouchableHighlight, Animated, View} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {
  themeStyles,
  lightThemeStyles,
  darkThemeStyles,
} from '../../styles/Styles';
import * as Animatable from 'react-native-animatable';
const FAB = Animatable.createAnimatableComponent(View);
const TabBarFAB = props => {
  let styles =
    props.utils.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  let floatRef = React.useRef();
  let mode = new Animated.Value(0);
  let buttonSize = new Animated.Value(1);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 0,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
      }),
    ]).start();
  };

  const viewX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [115, 70],
  });

  const viewY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-105, -160],
  });

  const editX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [115, 150],
  });

  const editY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-105, -160],
  });

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const sizeStyle = {
    transform: [{scale: buttonSize}],
    elevation: 20,
  };
  return (
    <>
      {props.utils.screen === 'Chats' && (
        <>
          <Animated.View
            style={{position: 'absolute', left: viewX, top: viewY}}>
            <TouchableHighlight style={styles.proifleImageBtns}>
              <Icon
                android="md-person"
                ios="ios-person"
                type="Ionicons"
                style={{color: 'white'}}
              />
            </TouchableHighlight>
          </Animated.View>
          <Animated.View
            style={{position: 'absolute', left: editX, top: editY}}>
            <TouchableHighlight style={styles.proifleImageBtns}>
              <Icon
                name="people"
                type="MaterialIcons"
                style={{color: 'white'}}
              />
            </TouchableHighlight>
          </Animated.View>

          <Animated.View
            style={[sizeStyle, {position: 'absolute', top: -35, left: '43%'}]}>
            <TouchableHighlight
              onPress={handlePress}
              underlayColor="transparent">
              <Animated.View style={{transform: [{rotate: rotation}]}}>
                <FAB
                  ref={ref => (floatRef = ref)}
                  activeOpacity={1}
                  animation="tada"
                  duration={2000}
                  style={[styles.tabBarFloatBtn, styles.tabBarFloatBtnBgClr]}>
                  <Icon
                    name={'plus'}
                    type={'Entypo'}
                    style={styles.tabBarFloatBtnClr}
                  />
                </FAB>
              </Animated.View>
            </TouchableHighlight>
          </Animated.View>
        </>
      )}
      {props.utils.screen !== 'Chats' && (
        <FAB
          ref={ref => (floatRef = ref)}
          activeOpacity={1}
          animation="tada"
          duration={2000}
          onPress={() => {
            console.log('pressed');
            floatRef.bounceIn(1000);
          }}
          style={[
            styles.tabBarFloatBtn,
            styles.tabBarFloatBtnBgClr,
            {position: 'absolute', top: -35, left: '43%'},
          ]}>
          <Icon
            name={'add-a-photo'}
            type={'MaterialIcons'}
            style={styles.tabBarFloatBtnClr}
          />
        </FAB>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
});
const mapDispatchToPros = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToPros,
)(TabBarFAB);
