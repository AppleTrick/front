import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import FeedDetailOption from '@/components/feed/FeedDetailOption';
import {
  colorHex,
  colors,
  feedNavigations,
  mainNavigations,
  mapNavigations,
} from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import useModal from '@/hooks/useModal';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailStore from '@/store/useDetailPostStore';
import useLocationStore from '@/store/useLocationStore';
import {getDateLocaleFormat, getLocalApiBaseUrl, SCREEN_WIDTH} from '@/utils';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  StackScreenProps,
} from '@react-navigation/stack';
import {useEffect, useLayoutEffect} from 'react';
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
  const {id, isModal} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);
  const insets = useSafeAreaInsets();
  const {setMoveLocation} = useLocationStore();
  const {setDetailPost} = useDetailStore();
  const detailOption = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      ...(isModal
        ? {
            // Modal에서 이동한 경우
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation, // 애니메이션 없음
          }
        : {
            // FeedHome에서 이동한 경우
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid, // 기존 애니메이션
          }),
    });
  }, [navigation, isModal]); // isModal 값이 변경될 때마다 옵션 업데이트

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
    console.log(isModal);
    if (isModal) {
      handlePressLocation();
    } else {
      navigation.goBack();
    }
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
              color={colors.WHITE}
              onPress={handleGoBack}
            />
            <Ionicons
              name="ellipsis-vertical"
              size={30}
              color={colors.WHITE}
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
            <Octicons name="location" size={10} color={colors.GRAY_500} />
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
            </View>
          </View>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
        {post.images.length > 0 && (
          <View style={styles.imageContentsContainer}>
            <PreviewImageList imageUris={post.images} />
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
            style={pressed => [
              pressed && styles.bookmarkerPressedContainer,
              styles.bookmarkerContainer,
            ]}>
            <Octicons name="star-fill" size={30} color={colors.GRAY_100} />
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

const styles = StyleSheet.create({
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
    backgroundColor: colors.GRAY_200,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  contentsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
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
    color: colors.BLACK,
  },
  infoColumValueText: {
    color: colors.PINK_700,
  },
  markerColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },

  addressText: {
    color: colors.GRAY_500,
    fontSize: 12,
  },
  addressContainer: {
    gap: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },

  descriptionText: {
    color: colors.BLACK,
    lineHeight: 25,
    fontSize: 16,
  },
  imageContentsContainer: {
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
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
    backgroundColor: colors.PINK_700,
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
