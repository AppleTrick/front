import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {SCREEN_WIDTH} from '@/utils';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';

interface DayOfWeeksProps {}

function DayOfWeeks({}: DayOfWeeksProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const weeks = ['일', '월', '화', '수', '목', '금', '토', '일'];

  return (
    <View style={styles.container}>
      {weeks.map((dayOfWeek, i) => {
        return (
          <View key={i} style={styles.item}>
            <Text
              style={[
                styles.text,
                dayOfWeek === '토' && styles.saturdayText,
                dayOfWeek === '일' && styles.sundayText,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    item: {
      width: SCREEN_WIDTH / 7,
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: colors[theme].BLACK,
    },
    saturdayText: {
      color: colors[theme].BLUE_500,
    },
    sundayText: {
      color: colors[theme].RED_500,
    },
  });

export default DayOfWeeks;
