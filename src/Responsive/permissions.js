import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import i18n from '../Language/i18n';

//=== android ===
//=== location ====
export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: i18n.t('perMission'),
        message: 'iSalamah wants to access your location ',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

//=== Read Permissions ===
export async function filesReadPermissions() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: i18n.t('perMission'),
        message: 'iSalamah need permission to read audio messages',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}
//=== Write Permissions ===
export async function filesWritePermissions() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: i18n.t('perMission'),
        message: 'iSalamah need permissions to store audio messages',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

//=== Camera Permissions===
export async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: i18n.t('perMission'),
        message: 'iSalamah wants to access camera ',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

//=== ios ===
//=== Image Permissions ===
export async function ImagePickerPerMissionIos() {
  let res = '';
  if (Platform.OS === 'ios') {
    res = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
  } else {
    res = await check(PERMISSIONS.ANDROID.CAMERA);
  }
  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    return true;
  } else {
    Alert.alert(i18n.t('perMission'), i18n.t('permissionMsgImage'), [
      {
        text: i18n.t('cancel'),
        onPress: () => console.log('permission denied'),
        style: 'cancel',
      },
      {
        text: i18n.t('openSettings'),
        onPress: () =>
          openSettings().catch(() => console.warn('cannot open settings')),
      },
    ]);
    return false;
  }
}
//=== Camera Permissions===
export async function CameraPermissionIos() {
  let res = '';
  if (Platform.OS === 'ios') {
    res = await check(PERMISSIONS.IOS.CAMERA);
  } else {
    res = await check(PERMISSIONS.ANDROID.CAMERA);
  }
  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    return true;
  } else {
    Alert.alert(i18n.t('perMission'), i18n.t('permissionMsgImage'), [
      {
        text: i18n.t('cancel'),
        onPress: () => console.log('permission denied'),
        style: 'cancel',
      },
      {
        text: i18n.t('openSettings'),
        onPress: () =>
          openSettings().catch(() => console.warn('cannot open settings')),
      },
    ]);
    return false;
  }
}
