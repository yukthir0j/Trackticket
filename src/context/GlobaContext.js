import {Alert, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo, {useNetInfoInstance} from '@react-native-community/netinfo';
import {showToast} from '../../utils/Toast.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Authcontext = createContext();
export const AuthContextProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  const Checknetinfo = async () => {
    const state = await NetInfo.fetch(); // Get the current network state
    if (!state.isConnected) {
      showToast('No internet connection.', 'error');
      return false; // No internet connection
    }
    return true; // Internet connection is available
  };


  const gotoSetting = () => {
    Alert.alert(
      'Notification Permission Denied',
      'Please grant permission for notifications in the app settings to continue.',
      [
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout', //title
      'Are you sure ,you want to logout ?', //message
      [
        {
          text: 'Cancel', // Cancel button
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', // OK button
          onPress: () => {
            setIsLogin(true);
            AsyncStorage.setItem('IsLogin', 'false');
            AsyncStorage.clear();
            setUserDetail(null);
            showToast('Logout successfully!');
            // some logic
          },
        },
      ],
      {cancelable: false}, // Optionally prevent dismissing by tapping outside the alert
    );
  };

  return (
    <Authcontext.Provider
      value={{
        isLogin,
        setIsLogin,
        Checknetinfo,

        // User Detail
        userDetail,
        setUserDetail,

        // logout func
        handleLogout,

        gotoSetting,
      }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuthContext = () => useContext(Authcontext);
