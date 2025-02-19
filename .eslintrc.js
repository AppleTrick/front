module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'], // prettier 추가
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    // 'prettier/prettier': ['error'], // Prettier 규칙 적용
    'react/self-closing-comp': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': 'off',
    'react-native/no-inline-styles': 'off',
  },
  parserOptions: {
    requireConfigFile: false,
  },
};
