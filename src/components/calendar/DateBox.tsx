import {colors} from '@/constants';
import {SCREEN_WIDTH} from '@/utils';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface DateBoxProps {
  date: number;
  selectedDate?: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
  hasSchedule: boolean;
}

function DateBox({
  date,
  selectedDate,
  onPressDate,
  isToday,
  hasSchedule,
}: DateBoxProps) {
  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              selectedDate === date && styles.selectedContainer,
              selectedDate === date && isToday && styles.selectedTodayContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                isToday && styles.todayText,
                selectedDate === date && styles.selectedDateText,
              ]}>
              {date}
            </Text>
          </View>
          {hasSchedule && <View style={styles.scheduleIndicator} />}
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
  selectedTodayContainer: {
    backgroundColor: colors.PINK_700,
  },
  todayText: {
    color: colors.PINK_700,
    fontWeight: 'bold',
  },
  selectedDateText: {
    color: colors.WHITE,
  },
  scheduleIndicator: {
    marginTop: 2,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.GRAY_500,
  },
});

export default DateBox;
