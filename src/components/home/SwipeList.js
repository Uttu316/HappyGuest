import React from 'react';
import {
  lightThemeStyles,
  darkThemeStyles,
  themeStyles,
} from '../../styles/Styles';
import {Text, View, Icon, Button} from 'native-base';
import {Alert} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {data} from '../../dummyData/Dummydata';
import ChatsListItem from './ChatsListItem';
import ListEmpty from './ListEmpty';

const SwipeList = props => {
  let styles =
    props.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};

  const [chatsItemData, setChatItemData] = React.useState(data);

  function handleDelte(item) {
    Alert.alert('Are you sure you want to delete this chat? ', item.userName, [
      {
        text: 'Delete',
        onPress: () => {
          let newData = chatsItemData.filter(each => each.id !== item.id);
          setChatItemData(newData);
        },
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
  }
  const HiddenButtons = (data, rowMap) => {
    return (
      <View style={styles.listHiddenBtnsBox}>
        <Button
          transparent
          style={styles.listHiddenBtn}
          onPress={() => {
            rowMap[data.item.id].closeRow();
            handleDelte(data.item);
          }}>
          <Icon
            name="delete-outline"
            type="MaterialCommunityIcons"
            style={styles.listHiddenDltBtn}
          />
          <Text style={styles.listHiddenBtnTxt}>Delete</Text>
        </Button>
        <Button transparent style={styles.listHiddenBtn}>
          <Icon
            name="pushpino"
            type="AntDesign"
            style={styles.listHiddenStickyBtn}
          />
          <Text style={styles.listHiddenBtnTxt}>Sticky</Text>
        </Button>
      </View>
    );
  };
  return (
    <SwipeListView
      data={chatsItemData}
      useFlatList={true}
      ListEmptyComponent={() => <ListEmpty theme={props.theme} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderHiddenItem={HiddenButtons}
      stopLeftSwipe={140}
      leftOpenValue={140}
      closeOnRowPress={true}
      closeOnScroll={true}
      onRowOpen={(rowKey, rowMap) => {
        setTimeout(() => {
          rowMap[rowKey] ? rowMap[rowKey].closeRow() : null;
        }, 5000);
      }}
      disableLeftSwipe={true}
      renderItem={(data, rowMap) => (
        <ChatsListItem
          data={data}
          theme={props.theme}
          rowMap={rowMap}
          {...props}
        />
      )}
    />
  );
};
export default SwipeList;
