import {CaledarPost} from '@/api';
import {
  colors,
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface EventListProps {
  posts: CaledarPost[];
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

function EventList({posts}: EventListProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();

  const handlePrssitem = (id: number) => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {id},
        initial: false,
      },
    });
  };

  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{right: 1}}>
      <View style={[styles.innerContainer, {marginBottom: insets.bottom + 30}]}>
        {posts?.map(post => (
          <Pressable
            key={post.id}
            style={styles.itemContainer}
            onPress={() => handlePrssitem(post.id)}>
            <View style={styles.itemHeader} />
            <View style={styles.infoContainer}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {post.address}
              </Text>
              <Text style={styles.titleText}>{post.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].WHITE,
      padding: 20,
    },
    innerContainer: {
      gap: 20,
    },
    itemContainer: {
      flexDirection: 'row',
    },
    itemHeader: {
      backgroundColor: colors[theme].PINK_700,
      width: 6,
      height: 50,
      marginRight: 8,
      borderRadius: 20,
    },
    infoContainer: {
      justifyContent: 'space-between',
    },
    addressText: {
      color: colors[theme].GRAY_500,
    },
    titleText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default EventList;
