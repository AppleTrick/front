import {Platform} from 'react-native';

const platformCheck = () => {
  return Platform.OS === 'ios'
    ? 'http://localhost:3030'
    : 'http://10.0.2.2:3030';
};

export {platformCheck};
