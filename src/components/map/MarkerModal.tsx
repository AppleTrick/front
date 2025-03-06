import {
  colors,
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomMarker from '../common/CustomMarker';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getDateWithSeparator} from '@/utils';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

function MarkerModal({markerId, isVisible, hide}: MarkerModalProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {data: post, isPending, isError} = useGetPost(markerId);

  const navigation = useNavigation<Navigation>();

  if (isPending || isError) {
    return <></>;
  }

  const handlePressModal = () => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {
          id: post.id,
        },
        initial: false,
      },
    });
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post?.images.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${
                        Platform.OS === 'ios'
                          ? 'http://localhost:3030'
                          : 'http://10.0.2.2:3030'
                      }/${post.images[0]?.uri}`,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post?.images.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <CustomMarker color={post.color} score={post.score} />
                </View>
              )}
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.addressContainer}>
                <Octicons
                  name="location"
                  size={16}
                  color={colors[theme].GRAY_500}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.addressText}>
                  {post?.address}
                </Text>
              </View>
              <Text style={styles.titleText}>{post.title}</Text>
              <Text style={styles.dateText}>
                {getDateWithSeparator(post.date, '.')}
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color={colors[theme].BLACK}
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      // backgroundColor: 'rgba(0,0,0 / 0.5)',
    },
    cardContainer: {
      backgroundColor: colors[theme].WHITE,
      margin: 10,
      borderRadius: 20,
      shadowColor: colors[theme].BLACK,
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.2,
      elevation: 1,
      borderColor: colors[theme].GRAY_500,
      borderWidth: 1.5,
    },
    cardInner: {
      padding: 20,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardAlign: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 35,
      borderWidth: 1,
    },
    infoContainer: {
      width: (Dimensions.get('screen').width * 3) / 5,
      marginLeft: 15,
      gap: 5,
    },
    addressContainer: {
      gap: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 10,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 15,
      fontWeight: 'bold',
    },
    dateText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

export default MarkerModal;

// navigation.reset({
//   index: 0,
//   routes: [
//     {
//       name: mainNavigations.FEED,
//       params: {
//         screen: feedNavigations.FEED_DETAIL,
//         params: {
//           id: post.id,
//         },
//       },
//     },
//   ],
// });
