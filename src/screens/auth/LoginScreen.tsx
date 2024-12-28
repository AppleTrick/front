import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../../components/InputField';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeText = (name: string, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={'이메일 입력해주세요'}
          inputMode="email"
          value={values.email}
          touched={touched.email}
          onChangeText={text => handleChangeText('email', text)}
          onBlur={() => handleBlur('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={'비밀번호 입력해주세요'}
          secureTextEntry
          value={values.password}
          touched={touched.password}
          onChangeText={text => handleChangeText('password', text)}
          onBlur={() => handleBlur('password')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
  },
});

export default LoginScreen;
