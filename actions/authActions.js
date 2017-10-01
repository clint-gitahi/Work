import { AsyncStorage } from 'react-native';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';
import {
  LoginManager,
  AccessToken,
} from 'react-native-fbsdk';

// How to use AsyncStorage
// AsyncStorage.setItem("fb_token", token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      // dispatch an action saying fb login is done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      // start up fb login process
      doFacebookLogin(dispatch)
    }
  };

const doFacebookLogin = async dispatch => {
  await LoginManager.logInWithReadPermissions(['public_profile']).then(
    (result) => {
      if (result.isCancelled) {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
      }
      if (result.deniedPermissions) {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
      }
      AccessToken.getCurrentAccessToken().then(async (data) => {
        let token = data.accessToken.toString();
        await AsyncStorage.setItem('fb_token', token);
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
      })
    }
  )
}
