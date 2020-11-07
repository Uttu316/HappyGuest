import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Thumbnail, Text, View, Card} from 'native-base';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import * as Animatable from 'react-native-animatable';
const AnimatedListItem = Animatable.createAnimatableComponent(Card);
const ChatsListItem = props => {
  let styles =
    props.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  let data = props.data ? props.data : null;
  function handleItemClick() {
    props.rowMap[data.item.id].closeRow();
    props.navigation.navigate('chat-room', {
      title: data.item.userName,
    });
  }
  return data ? (
    <TouchableOpacity activeOpacity={1} onPress={() => handleItemClick()}>
      <AnimatedListItem
        avatar
        animation="pulse"
        style={[styles.chatListItemBgClr, styles.chatListItem]}>
        <Thumbnail
          source={{
            uri: data.item.image,
          }}
        />
        <View style={styles.chatListItemBody}>
          <Text style={styles.myStoryDescriptionClr}>{data.item.userName}</Text>
          <Text note>{data.item.lastText}</Text>
        </View>
        <View style={styles.chatListItemRight}>
          <Text note>{data.item.time}</Text>
          <Text note>{data.item.id}</Text>
        </View>
      </AnimatedListItem>
    </TouchableOpacity>
  ) : null;
};
export default ChatsListItem;
