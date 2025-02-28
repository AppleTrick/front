type UserInformation = {
  email: string;
  password: string;
};

function isBlank(value: string) {
  return value.trim() === '';
}

const validateUser = (values: UserInformation) => {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 주소가 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8 ~ 20자 사이로 입력해주세요.';
  }

  return errors;
};

const validationLogin = (values: UserInformation) => {
  return validateUser(values);
};

const validateSignup = (
  values: UserInformation & {passwordConfirm: string},
) => {
  const errors = validateUser(values);
  const signupErros = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErros.passwordConfirm = '비밀번호가 일치하지 않습니다';
  }

  return signupErros;
};

const validateAddPost = (values: {title: string}) => {
  const errors = {
    title: '',
    description: '',
  };

  if (isBlank(values.title)) {
    errors.title = `제목은 1~30자 이내로 입력해주세요.`;
  }

  return errors;
};

const validateEditProile = (values: {nickname: string}) => {
  const errors = {
    nickname: '',
  };

  if (isBlank(values.nickname)) {
    errors.nickname = '닉네임을 입력해주세요';
  }

  return errors;
};

export {validationLogin, validateSignup, validateAddPost, validateEditProile};
