import {colors} from '@/constants';
import {Text} from 'react-native';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CalendarProps {}

function Calendar({}: CalendarProps) {
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.monthButtonContainer}>
        <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
      </Pressable>
      <Pressable style={styles.monthYearContainer}>
        <Text style={styles.titleText}>2025년 2월</Text>
      </Pressable>
      <Pressable style={styles.monthButtonContainer}>
        <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthButtonContainer: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
});

export default Calendar;
