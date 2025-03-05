import {colors} from '@/constants';
import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OptionContextValue {
  onClickOutside?: (event: GestureResponderEvent) => void;
}

// 함수를 전달해줄때 context 이용하기
const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animateType?: ModalProps['animationType'];
}

function OptionMain({
  children,
  isVisible,
  hideOption,
  animateType = 'slide',
  ...props
}: OptionMainProps) {
  const onClickOutside = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animateType}
      onRequestClose={hideOption}
      {...props}>
      <OptionContext.Provider value={{onClickOutside}}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}

function BackGround({children}: PropsWithChildren) {
  const optionContext = useContext(OptionContext);

  return (
    <SafeAreaView
      style={styles.optionBackGround}
      onTouchEnd={optionContext?.onClickOutside}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  return <View style={styles.optionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

function Button({
  children,
  isDanger = false,
  isChecked = false,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={pressed => [
        pressed && styles.optionButtonPressed,
        styles.optionButton,
      ]}
      {...props}>
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>
        {children}
      </Text>
      {isChecked && (
        <Ionicons name="checkmark" color={colors.BLUE_500} size={20} />
      )}
    </Pressable>
  );
}

function Title({children}: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.border}></View>;
}

export const CompoundOption = Object.assign(OptionMain, {
  Container,
  BackGround,
  Button,
  Title,
  Divider,
});

const styles = StyleSheet.create({
  optionBackGround: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  optionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  optionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  border: {
    borderBottomColor: colors.GRAY_300,
    borderBottomWidth: 1,
  },
});
