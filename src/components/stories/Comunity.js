import React from 'react';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import {
  Thumbnail,
  Text,
  View,
  Icon,
  Card,
  CardItem,
  Left,
  Body,
  Button,
} from 'native-base';
import {TouchableOpacity, FlatList, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {communityPosts} from '../../dummyData/Dummydata';

const AnimatableBox = Animatable.createAnimatableComponent(Card);
const Community = props => {
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
      {check && communityPosts ? (
        <Animatable.View animation="slideInUp">
          <FlatList
            nestedScrollEnabled={true}
            data={communityPosts}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => setCheck(!check)} key={index}>
                <Card style={[styles.communityCard]}>
                  <CardItem style={styles.communityCardBgClr}>
                    <Left>
                      <Thumbnail source={{uri: item.userIamge}} />
                      <Body>
                        <Text style={styles.communityCardNameClr}>
                          {item.userName}
                        </Text>
                        <Text note>{item.date}</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <Image
                    style={styles.communityCardImage}
                    source={{uri: item.image}}
                  />

                  <Text
                    style={[
                      styles.communityCardDesription,
                      styles.communityCardNameClr,
                      styles.communityCardBgClr,
                    ]}>
                    {item.description}
                  </Text>

                  <CardItem
                    style={[
                      styles.communityCardFooter,
                      styles.communityCardBgClr,
                    ]}>
                    <Button transparent>
                      <Icon
                        name="heart"
                        style={[
                          styles.communityCardLikeIcon,
                          styles.communityCardLikeIconInactiveClr,
                        ]}
                      />
                    </Button>
                    <Text note style={styles.communityCardLikeText}>
                      {item.likes} Likes
                    </Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
          />
        </Animatable.View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCheck(!check);
          }}>
          <AnimatableBox animation="fadeIn" style={styles.addStoryBox}>
            <Icon
              name="people"
              type="MaterialIcons"
              style={[styles.addStoryText, styles.listEmptytxtClr]}
            />
            <Text style={[styles.addStoryText, styles.listEmptytxtClr]}>
              No post available
            </Text>
          </AnimatableBox>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Community;

/*Remove tochable from no story box*/
