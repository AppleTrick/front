import ImageCarousel from '../common/ImageCarousel';
import useDetailStore from '@/store/useDetailPostStore';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';
import {StyleSheet} from 'react-native';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

function ImageZoomScreen({route}: ImageZoomScreenProps) {
  // index => 어떤 이미지를 클릭했는지 판단
  const {index} = route.params;
  const {detailPost} = useDetailStore();

  return <ImageCarousel images={detailPost?.images ?? []} />;
}

const styles = StyleSheet.create({});

export default ImageZoomScreen;
