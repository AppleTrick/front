import {colors} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import {ThemeMode} from '@/types';
import {ReactNode} from 'react';
import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

function HeaderButton({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 15,
      fontWeight: '500',
      color: colors[theme].PINK_500,
    },
    textError: {
      color: colors[theme].GRAY_500,
    },
  });

export default HeaderButton;
