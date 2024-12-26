module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    requireConfigFile: false, // Babel 설정 파일을 요구하지 않도록 설정
  },
};
