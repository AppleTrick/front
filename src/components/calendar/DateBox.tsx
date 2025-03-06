import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
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
  const {theme} = useThemeStore();
  const styles = styling(theme);

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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: SCREEN_WIDTH / 7,
      height: SCREEN_WIDTH / 7,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_200,
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
      backgroundColor: colors[theme].BLACK,
    },

    dateText: {
      fontSize: 17,
      color: colors[theme].BLACK,
    },
    selectedTodayContainer: {
      backgroundColor: colors[theme].PINK_700,
    },
    todayText: {
      color: colors[theme].PINK_700,
      fontWeight: 'bold',
    },
    selectedDateText: {
      color: colors[theme].WHITE,
    },
    scheduleIndicator: {
      marginTop: 2,
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_500,
    },
  });

export default DateBox;
