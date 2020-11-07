import React from 'react';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import BoxTitle from './BoxTitle';
import {Thumbnail, Text, View, Icon, Card} from 'native-base';
import {TouchableOpacity, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {allStories} from '../../dummyData/Dummydata';

const AnimatableBox = Animatable.createAnimatableComponent(Card);
const AllStories = props => {
  const [check, setCheck] = React.useState(false);
  let styles =
    props.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  React.useEffect(() => {
    setCheck(true);
  }, []);
  return (
    <View style={styles.allStoriesBox}>
      <BoxTitle title="All Stories" theme={props.theme} />
      {check && allStories ? (
        <FlatList
          style={styles.allStoriesList}
          data={allStories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setCheck(!check)}>
              <AnimatableBox
                animation="zoomIn"
                style={styles.allStoriesListItem}>
                <Thumbnail
                  square
                  large
                  source={{uri: item.image}}
                  style={styles.allStoriesListItemImage}
                />
                <Thumbnail
                  small
                  source={{uri: item.userIamge}}
                  style={styles.allStoriesListItemUserImage}
                />
              </AnimatableBox>
              <Text note style={styles.allStoriesListItemText}>
                {' '}
                {item.userName.length > 13
                  ? item.userName.slice(0, 13) + '...'
                  : item.userName}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCheck(!check);
          }}>
          <AnimatableBox animation="fadeIn" style={styles.addStoryBox}>
            <Icon
              android="md-images"
              ios="ios-images"
              type="Ionicons"
              style={[styles.addStoryText, styles.listEmptytxtClr]}
            />
            <Text style={[styles.addStoryText, styles.listEmptytxtClr]}>
              No story available
            </Text>
          </AnimatableBox>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default AllStories;

/*Remove tochable from no story box*/
