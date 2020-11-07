import React from 'react';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import {Thumbnail, Text, View, Icon, Card} from 'native-base';
import {TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {myStory} from '../../dummyData/Dummydata';

const AnimatedBox = Animatable.createAnimatableComponent(Card);
const MyStory = props => {
  const [check, setCheck] = React.useState(false);
  let styles =
    props.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  const flippingAnimation = {
    0: {
      rotateX: '90deg',
    },
    1: {
      rotateX: '0deg',
    },
  };
  React.useEffect(() => {
    setCheck(true);
  }, []);
  return (
    <>
      <Text style={[styles.myStoryTitle, styles.myStoryTitleClr]}>
        My Story
      </Text>
      {check ? (
        <TouchableOpacity
          onPress={() => {
            setCheck(!check);
          }}>
          <AnimatedBox
            avatar
            animation={flippingAnimation}
            style={[styles.chatListItemBgClr, styles.chatListItem]}>
            <Thumbnail
              square
              large
              style={styles.myStoryImage}
              source={{
                uri: myStory.image,
              }}
            />

            <View style={styles.chatListItemBody}>
              <Text style={styles.myStoryDescriptionClr}>
                {myStory.description.length > 30
                  ? myStory.description.slice(0, 30) + '...'
                  : myStory.description}
              </Text>
              <View style={styles.myStoryViews}>
                <Icon
                  name="eye"
                  style={[styles.myStoryEyeIcon, styles.myStoryDescriptionClr]}
                />
                <Text note>{myStory.views} Views</Text>
              </View>
            </View>
            <View style={styles.chatListItemRight}>
              <Text note>{myStory.date}</Text>
              <Text note style={styles.myStoryTime}>
                {myStory.time}
              </Text>
            </View>
          </AnimatedBox>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCheck(!check);
          }}>
          <AnimatedBox animation="fadeIn" style={styles.addStoryBox}>
            <Text style={[styles.addStoryText, styles.listEmptytxtClr]}>
              Click
            </Text>
            <Icon
              name="add-a-photo"
              type="MaterialIcons"
              style={[styles.addStoryText, styles.listEmptytxtClr]}
            />
            <Text style={[styles.addStoryText, styles.listEmptytxtClr]}>
              {' '}
              to add your story.
            </Text>
          </AnimatedBox>
        </TouchableOpacity>
      )}
    </>
  );
};
export default MyStory;

/*remove check and touchable of hidden element*/
