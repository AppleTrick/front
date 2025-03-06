import {StyleSheet, View} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';
import useLegendStorage from '@/hooks/useLegendStorage';

interface MapLegendOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MapLegendOption({isVisible, hideOption}: MapLegendOptionProps) {
  const {set} = useLegendStorage();

  const handlePressShow = () => {
    set(true);
    hideOption();
  };

  const handlePressHide = () => {
    set(false);
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={handlePressShow}>
            표시하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={handlePressHide}>
            숨기기
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

const styles = StyleSheet.create({});

export default MapLegendOption;
