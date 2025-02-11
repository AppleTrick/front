import Octicons from 'react-native-vector-icons/Octicons';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import CustomButton from '@/components/common/CustomButton';
import DatePickerOption from '@/components/post/DatePickerOption';
import ImageInput from '@/components/post/ImageInput';
import InputField from '@/components/common/InputField';
import MarkerSelector from '@/components/post/MarkerSelector';
import PreviewImageList from '@/components/common/PreviewImageList';
import ScoreInput from '@/components/post/ScoreInput';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermissions from '@/hooks/usePermissions';
import {MarkerColor} from '@/types';
import {colors} from '@/constants';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import useDetailStore from '@/store/useDetailPostStore';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

function PostForm({location, isEdit = false}: PostFormProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const {detailPost} = useDetailStore();
  const isEditMode = isEdit && detailPost;

  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const datePickerModal = useModal();
  const [date, setDate] = useState(
    isEditMode ? new Date(detailPost.date) : new Date(),
  );
  const [isPicked, setIsPicked] = useState(false);
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost.images : [],
  });

  usePermissions('PHOTO');

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    datePickerModal.hide();
    setIsPicked(true);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score: score,
      imageUris: imagePicker.imageUris,
    };
    // 수정
    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
        },
      );
      return;
    }

    // 새로운 것으로 추가
    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
        onError: error => {
          console.error('Mutation Error:', error);
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [navigation, handleSubmit]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={
              isPicked || isEdit
                ? getDateWithSeparator(date, '. ')
                : '날짜 선택'
            }
            onPress={datePickerModal.show}
          />
          <InputField
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
            score={score}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
              showOption={true}
            />
          </View>
          <DatePickerOption
            date={date}
            isVisible={datePickerModal.isVisible}
            onChangeDate={handleChangeDate}
            onConfirmData={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});

export default PostForm;
