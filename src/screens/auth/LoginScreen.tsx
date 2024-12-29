import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validationLogin} from '../../utils';

interface LoginScreenProps {}

function LoginScreen({}: LoginScreenProps) {
  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });

  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // });

  // const handleChangeText = (name: string, text: string) => {
  //   setValues({
  //     ...values,
  //     [name]: text,
  //   });
  // };

  // const handleBlur = (name: string) => {
  //   setTouched({
  //     ...touched,
  //     [name]: true,
  //   });
  // };

  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validationLogin,
  });

  const handleSubmit = () => {
    console.log('values', login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          // error={'이메일 입력해주세요'}
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          // error={'비밀번호 입력해주세요'}
          error={login.errors.password}
          secureTextEntry
          touched={login.touched.password}
          // value={values.password}
          // onChangeText={text => handleChangeText('password', text)}
          // onBlur={() => handleBlur('password')}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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
    marginBottom: 30,
  },
});

export default LoginScreen;
