import {PermissionsAndroid} from 'react-native';

export const requestPermission = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
  ]);
  return granted;
};
