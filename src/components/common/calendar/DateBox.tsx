import {colors} from '@/constants';
import {SCREEN_WIDTH} from '@/utils';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface DateBoxProps {
  date: number;
  selectedDate?: number;
}

function DateBox({date, selectedDate}: DateBoxProps) {
  return (
    <Pressable style={styles.container}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  dateContainer: {
    // backgroundColor: 'red',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  selectedContainer: {
    backgroundColor: colors.BLACK,
  },
  dateText: {
    fontSize: 17,
    color: colors.BLACK,
  },
  selectedDateText: {
    color: colors.WHITE,
  },
});

export default DateBox;
