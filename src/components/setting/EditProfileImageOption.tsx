import {View} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';

interface EditProfileImageOptionProps {
  isVisible: boolean;
  hideOption: () => void;
  onChangeImage: () => void;
}

function EditProfileImageOption({
  isVisible,
  hideOption,
  onChangeImage,
}: EditProfileImageOptionProps) {
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={onChangeImage}>
            앨범에서 사진선택
          </CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.BackGround>
    </CompoundOption>
  );
}

export default EditProfileImageOption;
