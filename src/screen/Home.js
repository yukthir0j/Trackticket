import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {Iconify} from 'react-native-iconify';
import {showToast} from '../../utils/Toast';

export default function Home() {
  const navigation = useNavigation();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const backPressedOnce = useRef(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isFocused) {
          if (!backPressedOnce.current) {
            backPressedOnce.current = true;
            showToast("Tap again if you're ready to exit.");
            setTimeout(() => {
              backPressedOnce.current = false;
            }, 2000); // Reset backPressedOnce after 2 seconds
            return true;
          } else {
            BackHandler.exitApp();
            return true;
          }
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <View
        style={[
          styles.maincontainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Header */}
        <View style={styles.headerView}>
          <View>
            <CustomText style={{fontFamily: fonts.Bold, fontSize: 24}}>
              Welcome Back ,
            </CustomText>
            <CustomText style={{fontFamily: fonts.Bold, fontSize: 24, top: -4}}>
              Murshid
            </CustomText>
          </View>

          <View style={styles.profileImage}>
            <Iconify
              icon="fa-solid:user"
              size={25}
              color={theme.colors.onBackground}
            />
          </View>
        </View>

        {/* total fair  */}
        <View
          style={[styles.FairView, {backgroundColor: theme.colors.appDark}]}>
          <View>
            <CustomText style={[styles.totalText, {fontFamily: fonts.Regular}]}>
              Total Fair
            </CustomText>
            <CustomText style={[styles.valueText, {fontFamily: fonts.Regular}]}>
              $1,23,444
            </CustomText>
          </View>

          <Iconify icon="cryptocurrency:fair" size={35} color={'#fff'} />
        </View>

        <View style={styles.rulesContainer}>
          <CustomText style={[styles.rulesTitle, {fontFamily: fonts.Bold}]}>
            Conductor Guidelines
          </CustomText>

          <View style={styles.rule}>
            <CustomText
              style={[styles.ruleNumber, {fontFamily: fonts.Regular}]}>
              1.
            </CustomText>
            <CustomText style={[styles.ruleText, {fontFamily: fonts.Regular}]}>
              Ensure accurate customer details are recorded, including the image
              and fare information.
            </CustomText>
          </View>

          <View style={styles.rule}>
            <CustomText
              style={[styles.ruleNumber, {fontFamily: fonts.Regular}]}>
              2.
            </CustomText>
            <CustomText style={[styles.ruleText, {fontFamily: fonts.Regular}]}>
              Maintain professionalism and assist customers politely throughout
              the journey.
            </CustomText>
          </View>

          <View style={styles.rule}>
            <CustomText
              style={[styles.ruleNumber, {fontFamily: fonts.Regular}]}>
              3.
            </CustomText>
            <CustomText style={[styles.ruleText, {fontFamily: fonts.Regular}]}>
              Verify daily fare collections and report discrepancies
              immediately.
            </CustomText>
          </View>

          <View style={styles.rule}>
            <CustomText
              style={[styles.ruleNumber, {fontFamily: fonts.Regular}]}>
              4.
            </CustomText>
            <CustomText style={[styles.ruleText, {fontFamily: fonts.Regular}]}>
              Keep the app updated and ensure proper syncing of data to avoid
              errors.
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  FairView: {
    padding: 21,
    marginTop: 5,
    borderRadius: 15,
    marginHorizontal: 2,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    color: '#fff',
  },
  valueText: {
    fontSize: 28,
    color: '#fff',
  },
  rulesContainer: {
    padding: 15,
    backgroundColor: '#f9f9f1',
    borderRadius: 8,
    margin: 2,
    elevation: 2,
    marginVertical: 13,
  },
  rulesTitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ruleNumber: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 10,
  },
  ruleText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    flex: 1,
  },
});
