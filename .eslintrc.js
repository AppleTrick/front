module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'], // prettier 추가
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error'], // Prettier 규칙 적용
  },
  parserOptions: {
    requireConfigFile: false,
  },
};
