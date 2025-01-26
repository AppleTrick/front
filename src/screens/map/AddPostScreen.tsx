import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import DatePickerOption from '@/components/DatePickerOption';
import ImageInput from '@/components/ImageInput';
import InputField from '@/components/InputField';
import MarkerSelector from '@/components/MarkerSelector';
import PreviewImageList from '@/components/PreviewImageList';
import ScoreInput from '@/components/ScoreInput';
import {colors, mapNavigations} from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermissions from '@/hooks/usePermissions';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {MarkerColor} from '@/types';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Octicons from 'react-native-vector-icons/Octicons';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });
  const datePickerModal = useModal();
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const imagePicker = useImagePicker({
    initialImages: [],
  });

  usePermissions('PHOTO');

  // console.log('imagePicker.imageUris', imagePicker.imageUris);

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
      imageUris: [],
    };

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
  });

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
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
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
            <PreviewImageList imageUris={imagePicker.imageUris} />
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

export default AddPostScreen;
