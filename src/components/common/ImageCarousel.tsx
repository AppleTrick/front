import {colors} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import {ImageUri, ThemeMode} from '@/types';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(pressedIndex);
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);

    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: insets.top}]}
        onPress={() => navigation.goBack()}>
        <Octicons name="arrow-left" size={30} color={colors[theme].GRAY_500} />
      </Pressable>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030'
                    : 'http://10.0.2.2:3030'
                }/${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        onScroll={handleScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        // 이미지 최적화
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
      <View style={[styles.pageContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currentPageDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors[theme].WHITE,
    },
    backButton: {
      position: 'absolute',
      left: 5,
      zIndex: 1,
      // backgroundColor: colors[theme].PINK_700,
      height: 40,
      width: 40,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    pageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
    },
    pageDot: {
      margin: 4,
      backgroundColor: colors[theme].GRAY_200,
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    currentPageDot: {
      backgroundColor: colors[theme].PINK_700,
    },
  });

export default ImageCarousel;
