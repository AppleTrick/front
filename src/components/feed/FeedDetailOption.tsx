import {StyleSheet} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function FeedDetailOption({isVisible, hideOption}: FeedDetailOptionProps) {
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Button isDanger>삭제하기</CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button>수정하기</CompoundOption.Button>
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

const styles = StyleSheet.create({});

export default FeedDetailOption;
