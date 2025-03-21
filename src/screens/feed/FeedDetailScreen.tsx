import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import FeedDetailOption from '@/components/feed/FeedDetailOption';
import {
  colorHex,
  colors,
  feedNavigations,
  mainNavigations,
  mapNavigations,
  settingNavigations,
} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useMutateFavoritePost from '@/hooks/queries/useFavoritePost';
import useGetPost from '@/hooks/queries/useGetPost';
import useModal from '@/hooks/useModal';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailStore from '@/store/useDetailPostStore';
import useLocationStore from '@/store/useLocationStore';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {getDateLocaleFormat, getLocalApiBaseUrl, SCREEN_WIDTH} from '@/utils';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Suspense, useEffect} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

function FeedDetailScreen({route, navigation}: FeedDetailScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {id} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const favoriteMutation = useMutateFavoritePost();
  const insets = useSafeAreaInsets();
  const {setMoveLocation} = useLocationStore();
  const {setDetailPost} = useDetailStore();
  const detailOption = useModal();

  useEffect(() => {
    post && setDetailPost(post);
  }, [post]);

  if (isPending || isError) {
    return <></>;
  }
  const handlePressLocation = () => {
    const {latitude, longitude} = post;
    setMoveLocation({latitude, longitude});
    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MAP_HOME,
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressFavorite = () => {
    favoriteMutation.mutate(post.id);
  };

  const handlePressCategory = () => {
    navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.EDIT_CATEGORY,
      initial: false,
    });
  };

  return (
    <>
      <ScrollView
        scrollIndicatorInsets={{right: 1}}
        style={
          insets.bottom
            ? [styles.container, {marginBottom: insets.bottom + 50}]
            : [styles.container, styles.scrollNoInsets]
        }>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <Octicons
              name="arrow-left"
              size={30}
              color={colors[theme].WHITE}
              onPress={handleGoBack}
            />
            <Ionicons
              name="ellipsis-vertical"
              size={30}
              color={colors[theme].WHITE}
              onPress={detailOption.show}
            />
          </View>
        </SafeAreaView>
        <View style={styles.imageContainer}>
          {post?.images.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri: `${getLocalApiBaseUrl()}/${post?.images[0].uri}`,
              }}
              resizeMode="cover"
            />
          )}
          {post.images.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>
        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Octicons
              name="location"
              size={10}
              color={colors[theme].GRAY_500}
            />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {post.address}
            </Text>
          </View>
          <Text style={styles.titleText}>{post.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColum}>
                <Text style={styles.infoColumKeyText}>방문날짜</Text>
                <Text style={styles.infoColumValueText}>
                  {getDateLocaleFormat(post.date)}
                </Text>
              </View>
              <View style={styles.infoColum}>
                <Text style={styles.infoColumKeyText}>평점</Text>
                <Text style={styles.infoColumValueText}>{post.score}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoColum}>
                <Text style={styles.infoColumKeyText}>마커색상</Text>
                <View
                  style={[
                    styles.markerColor,
                    {backgroundColor: colorHex[post.color]},
                  ]}
                />
              </View>
              <View style={styles.infoColum}>
                <Text style={styles.infoColumKeyText}>카테고리</Text>
                {categories?.[post.color] ? (
                  <Text style={styles.infoColumValueText}>
                    {categories?.[post.color]}
                  </Text>
                ) : (
                  <Pressable
                    style={styles.emptyCategoryContainer}
                    onPress={handlePressCategory}>
                    <Text style={styles.infoColumKeyText}>미설정</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
        {post.images.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <PreviewImageList imageUris={post.images} zoomEnable />
          </View>
        )}
      </ScrollView>
      <View style={[styles.bottomContainer, {paddingBottom: insets.bottom}]}>
        <View
          style={[
            styles.tabContainer,
            insets.bottom === 0 && styles.tabContainerNoInsets,
          ]}>
          <Pressable
            style={({pressed}) => [
              pressed && styles.bookmarkerPressedContainer,
              styles.bookmarkerContainer,
            ]}
            onPress={handlePressFavorite}>
            <Octicons
              name="star-fill"
              size={30}
              color={
                post.isFavorite
                  ? colors[theme].YELLOW_500
                  : colors[theme].GRAY_100
              }
            />
          </Pressable>
          <CustomButton
            label="위치보기"
            size="medium"
            variant="filled"
            onPress={handlePressLocation}
          />
        </View>
      </View>
      <FeedDetailOption
        isVisible={detailOption.isVisible}
        hideOption={detailOption.hide}
      />
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      zIndex: 1,
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    imageContainer: {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    emptyImageContainer: {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[theme].GRAY_200,
      borderColor: colors[theme].GRAY_200,
      borderWidth: 1,
    },
    contentsContainer: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: colors[theme].WHITE,
      marginBottom: 10,
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors[theme].BLACK,
    },
    infoContainer: {
      marginVertical: 20,
      gap: 8,
    },
    infoRow: {
      flexDirection: 'row',
    },
    infoColum: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    infoColumKeyText: {
      color: colors[theme].BLACK,
    },
    infoColumValueText: {
      color: colors[theme].PINK_700,
    },
    markerColor: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    emptyCategoryContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].GRAY_300,
      padding: 2,
      borderRadius: 2,
    },
    addressText: {
      color: colors[theme].GRAY_500,
      fontSize: 12,
    },
    addressContainer: {
      gap: 5,
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 10,
    },

    descriptionText: {
      color: colors[theme].BLACK,
      lineHeight: 25,
      fontSize: 16,
    },
    imageContentsContainer: {
      paddingVertical: 15,
      backgroundColor: colors[theme].WHITE,
      marginBottom: 10,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'flex-end',
      paddingTop: 10,
      paddingHorizontal: 10,
      backgroundColor: colors[theme].WHITE,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors[theme].GRAY_200,
    },
    tabContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    tabContainerNoInsets: {
      marginBottom: 10,
    },
    scrollNoInsets: {
      marginBottom: 65,
    },

    bookmarkerContainer: {
      backgroundColor: colors[theme].PINK_700,
      height: '100%',
      paddingHorizontal: 5,
      justifyContent: 'center',
      borderRadius: 3,
    },
    bookmarkerPressedContainer: {
      opacity: 0.5,
    },
  });

export default FeedDetailScreen;
