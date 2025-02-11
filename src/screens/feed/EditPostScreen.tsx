import {feedNavigations, mapNavigations} from '@/constants';
import {StackScreenProps} from '@react-navigation/stack';
import PostForm from '@/components/post/PostForm';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.EDIT_POST
>;

function EditPostScreen({route, navigation}: EditPostScreenProps) {
  const {location} = route.params;

  return <PostForm location={location} />;
}

export default EditPostScreen;
