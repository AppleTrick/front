import {colors} from '@/constants';
import {SCREEN_WIDTH} from '@/utils';
import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';

interface DayOfWeeksProps {}

function DayOfWeeks({}: DayOfWeeksProps) {
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

const styles = StyleSheet.create({
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
    color: colors.BLACK,
  },
  saturdayText: {
    color: colors.BLUE_500,
  },
  sundayText: {
    color: colors.RED_500,
  },
});

export default DayOfWeeks;
