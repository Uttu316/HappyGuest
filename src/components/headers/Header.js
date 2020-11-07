import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  themeStyles,
  darkThemeStyles,
  lightThemeStyles,
} from '../../styles/Styles';
import {Icon} from 'native-base';
import {Badge} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
const Header = props => {
  const [searchIcon, showSearchIcon] = React.useState(false);
  const [searchBar, showSearchBar] = React.useState(false);
  const [search, setSearch] = React.useState('');
  let styles =
    props.theme === 'light'
      ? {...themeStyles, ...lightThemeStyles}
      : {...themeStyles, ...darkThemeStyles};
  React.useEffect(() => {
    if (props.searchIcon) {
      showSearchIcon(true);
    } else {
      showSearchIcon(false);
    }
  }, []);
  return (
    <>
      <View style={[styles.header, styles.headerClr]}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Icon
            name="text"
            type="MaterialCommunityIcons"
            style={[styles.textClr, styles.drawerIcon]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitleClr, styles.headerTitle]}>
          {props.title}
        </Text>
        {searchIcon ? (
          <TouchableOpacity onPress={() => showSearchBar(!searchBar)}>
            <Icon
              name="search"
              type="EvilIcons"
              style={[styles.textClr, styles.searchIcon]}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('notifications')}>
          <Badge
            status="success"
            containerStyle={styles.notificationIconBadge}
          />
          <Icon
            name="bell"
            type="EvilIcons"
            style={[styles.textClr, styles.notificationIcon]}
          />
        </TouchableOpacity>
      </View>
      {searchBar && searchIcon ? (
        <Animatable.View
          style={[styles.searchBox, styles.searchBoxClr]}
          animation="lightSpeedIn">
          <SearchBar
            placeholder="Search chat..."
            onChangeText={text => setSearch(text)}
            value={search}
            lightTheme={true}
            cancelIcon={false}
            containerStyle={[styles.searchBar]}
            inputStyle={[styles.searchInput, styles.searchInputClr]}
          />
          <TouchableOpacity
            onPress={() => {
              showSearchBar(false);
            }}>
            <Text style={[styles.searchCancel, styles.searchCancelClr]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      ) : null}
    </>
  );
};

export default Header;
