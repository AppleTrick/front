import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmData: () => void;
}

function DatePickerOption({
  isVisible,
  date,
  onChangeDate,
  onConfirmData,
}: DatePickerOptionProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.optionBackground}>
        <View style={styles.optionContainer}>
          <View style={styles.PickerContainer}>
            <DatePicker
              mode="date"
              theme="light"
              date={date}
              onDateChange={onChangeDate}
              locale="ko"
            />
          </View>
        </View>
        <View style={styles.optionContainer}>
          <Pressable style={styles.optionButton} onPress={onConfirmData}>
            <Text style={styles.optionText}>확인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0 / 0.5)',
    },
    optionContainer: {
      borderRadius: 15,
      marginHorizontal: 10,
      marginBottom: 10,
      backgroundColor: colors[theme].GRAY_100,
      overflow: 'hidden',
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      gap: 5,
    },
    PickerContainer: {
      alignItems: 'center',
    },
    optionText: {
      color: colors[theme].BLUE_500,
      fontSize: 17,
      fontWeight: '500',
    },
  });

export default DatePickerOption;
