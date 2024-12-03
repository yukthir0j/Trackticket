import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Snackbar,
  TextInput,
  useTheme,
} from 'react-native-paper';
import Header from '../component/Header';
import CustomText from '../customText/CustomText';
import {fonts} from '../customText/fonts';
import {Iconify} from 'react-native-iconify';
import {showToast} from '../../utils/Toast';
import {uploadImageToCloudinary} from '../cloudinary';
import {useAuthContext} from '../context/GlobaContext';
import axios from 'axios';

export default function Form({route}) {
  let {imageUri} = route.params;
  const {userDetail, ipAddress} = useAuthContext();

  const navigation = useNavigation();
  const theme = useTheme();
  const [spinner, setSpinner] = useState(false);
  const [submitSpinner, setSubmitSpinner] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const [errors, setErrors] = useState({});

  const [visible, setVisible] = useState(false);
  const [showimage, setShowimage] = useState(true);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [screen, setScreen] = useState('');
  const [form, setForm] = useState({
    startDestination: '',
    endDestination: '',
    fare: '',
    transactionMode: '',
  });

  // const handleVerify = async () => {
  //   await setSpinner(true);
  //   onToggleSnackBar();
  //   // Wait for the image upload to complete and get the image URL
  //   const uploadedImageUrl = await uploadImageToCloudinary(
  //     form?.name,
  //     // form?.profile_image,
  //     imageUri,
  //     `Ticket-${userDetail?.role}` || 'Track-Ticket',
  //   );
  //   console.log(uploadedImageUrl.imageUri, 'uploadedImageUrl');
  //   showToast('Sent Successfully ...');
  //   try {
  //     let data = {image: uploadedImageUrl?.imageUri};
  //     let response = await axios.post(`${ipAddress}/face_match`, data); //Live
  //     console.log(response.data, 'response');

  //     let message = response.data.message;
  //     showToast(`${message}`);
  //     if (response.data.status) {
  //       await setSpinner(false);
  //       await setShowimage(false);
  //       setScreen('User Detail');
  //       onDismissSnackBar();
  //     }
  //   } catch (error) {
  //     console.log(error, 'error');
  //     if (axios.isAxiosError(error)) {
  //       // Check if the error has a response (like status 400 errors)
  //       if (error.response) {
  //         showToast(`${error.response.data.error}`);
  //       }
  //     }
  //   }
  // };

  const handleVerify = async () => {
    await setSpinner(true);
    onToggleSnackBar();
    setTimeout(async () => {
      showToast('Sent Successfully ...');
      await setSpinner(false);
      await setShowimage(false);
      setScreen('User Detail');
      onDismissSnackBar();
    }, 3000);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMode = mode => {
    setForm(prev => ({
      ...prev,
      transactionMode: mode,
    }));
    if (mode == 'UPI') setShowScanner(true);
  };

  const validateForm = () => {
    let newError = {};
    if (!form.startDestination) {
      newError.startDestination = 'Start Destination is Required';
    }
    if (!form.endDestination) {
      newError.endDestination = 'End Destination is Required';
    }
    if (!form.fare) {
      newError.fare = 'Fair Amount is Required';
    }
    if (!form.transactionMode) {
      newError.transactionMode = 'Transaction mode is Required';
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };
  const SubmitForm = async () => {
    await setSubmitSpinner(true);
    // if (validateForm()) {
    //   showToast('Submitted Successfully ....');
    // } else {
    // await setSubmitSpinner(false);
    // }

    showToast('Submitted Successfully ....');
    await setSubmitSpinner(false);
    navigation.goBack();
  };

  const ScannerModal = () => {
    return (
      <>
        <View style={styles.scannerView}>
          <View style={styles.cancelIcon}>
            <Iconify
              onPress={() => setShowScanner(false)}
              color={theme.colors.btn}
              size={36}
              icon="ix:cancel"
            />
          </View>
          <Image
            style={styles.scannerImage}
            source={require('../../assets/Image/scanner.png')}
          />
        </View>
      </>
    );
  };
  return (
    <>
      <Header screenName={screen} />

      {showScanner && <ScannerModal />}

      <View
        style={[
          styles.maincontainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {/* Preview image and Submit Btn */}

          {showimage ? (
            <>
              <View style={{marginBottom: 10}}>
                <CustomText
                  style={[
                    {
                      fontSize: 22,
                      fontFamily: fonts.SemiBold,
                    },
                  ]}>
                  Image Preview :
                </CustomText>
              </View>
              <View style={styles.imageView}>
                <Image style={styles.image} source={{uri: imageUri}} />
              </View>

              <TouchableOpacity
                onPress={spinner ? () => {} : handleVerify}
                activeOpacity={0.8}
                style={[styles.button, {backgroundColor: theme.colors.btn}]}>
                {spinner ? (
                  <ActivityIndicator size={25} color={theme.colors.appDark} />
                ) : (
                  <CustomText
                    style={[
                      {
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: fonts.Bold,
                      },
                    ]}>
                    Verify
                  </CustomText>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View>
                <TextInput
                  mode="outlined"
                  label={'Start Destination'}
                  style={styles.input}
                  value={form.startDestination}
                  onChangeText={value =>
                    handleChange('startDestination', value)
                  }
                />
                {errors.startDestination && (
                  <CustomText
                    style={[
                      styles.errorText,
                      {fontFamily: fonts.Light, color: theme.colors.error},
                    ]}>
                    {errors.startDestination}
                  </CustomText>
                )}

                <TextInput
                  mode="outlined"
                  label={'End Destination'}
                  style={styles.input}
                  value={form.endDestination}
                  onChangeText={value => handleChange('endDestination', value)}
                />
                {errors.endDestination && (
                  <CustomText
                    style={[
                      styles.errorText,
                      {fontFamily: fonts.Light, color: theme.colors.error},
                    ]}>
                    {errors.endDestination}
                  </CustomText>
                )}

                <TextInput
                  mode="outlined"
                  label={'Fair Amount'}
                  style={styles.input}
                  value={form.fare}
                  keyboardType="numeric"
                  onChangeText={value => handleChange('fare', value)}
                />

                {errors.fare && (
                  <CustomText
                    style={[
                      styles.errorText,
                      {fontFamily: fonts.Light, color: theme.colors.error},
                    ]}>
                    {errors.fare}
                  </CustomText>
                )}

                <View style={{marginVertical: 6}}>
                  <CustomText
                    style={{fontFamily: fonts.SemiBold, fontSize: 16}}>
                    Transaction Mode :
                  </CustomText>

                  <View style={styles.mainCardView}>
                    <TouchableOpacity
                      onPress={() => handleMode('Cash')}
                      activeOpacity={0.6}
                      style={[
                        styles.cardview,
                        {
                          backgroundColor:
                            form.transactionMode == 'Cash'
                              ? theme.colors.appDark
                              : 'transparent',
                        },
                      ]}>
                      <Iconify
                        color={theme.colors.btn}
                        size={40}
                        icon="game-icons:cash"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleMode('UPI')}
                      activeOpacity={0.6}
                      style={[
                        styles.cardview,
                        {
                          backgroundColor:
                            form.transactionMode == 'UPI'
                              ? theme.colors.appDark
                              : 'transparent',
                        },
                      ]}>
                      <Iconify
                        color={theme.colors.btn}
                        size={40}
                        icon="material-symbols:upi-pay-outline-rounded"
                      />
                    </TouchableOpacity>
                  </View>

                  {errors.transactionMode && (
                    <CustomText
                      style={[
                        styles.errorText,
                        {fontFamily: fonts.Light, color: theme.colors.error},
                      ]}>
                      {errors.transactionMode}
                    </CustomText>
                  )}
                </View>

                {/* submit Btn */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={SubmitForm}
                  style={[
                    styles.button,
                    {backgroundColor: theme.colors.btn, marginBottom: 40},
                  ]}>
                  {submitSpinner ? (
                    <ActivityIndicator size={25} color={theme.colors.appDark} />
                  ) : (
                    <CustomText
                      style={[
                        {
                          color: '#fff',
                          fontSize: 16,
                          fontFamily: fonts.Bold,
                        },
                      ]}>
                      Submit
                    </CustomText>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Scanner Modal */}
        </ScrollView>
      </View>

      <Snackbar
        duration={30000} // 30 seconds
        visible={visible}
        style={{backgroundColor: theme.colors.appDark}}>
        <CustomText
          style={{fontFamily: fonts.Regular, fontSize: 14, color: '#fff'}}>
          Please wait... Sending and verifying the image.
        </CustomText>
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  imageView: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: Dimensions.get('window').width / 1.2,
    width: Dimensions.get('window').width / 1.2,
    borderRadius: 40,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 6,
  },
  mainCardView: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 4,
  },
  cardview: {
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
  },
  scannerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10, // Bring it on top
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  scannerImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
  cancelIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
