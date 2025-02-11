import {colors} from '@/constants';
import {ImageUri} from '@/types';
import {Dimensions, FlatList, Image, Platform} from 'react-native';
import {StyleSheet, View} from 'react-native';

interface ImageCarouselProps {
  images: ImageUri[];
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images}: ImageCarouselProps) {
  console.log(images);

  return (
    <View style={styles.container}>
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
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageCarousel;
