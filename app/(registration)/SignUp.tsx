import { BackHandler, StyleSheet, View } from 'react-native';
import { Text, TextInput } from '@components/Text';
import React, { useState } from 'react';
import { compactStyles } from '@helpers/styles';
import AccountInformation from '@components/authScreenComponents/AccountInformation';
import ContactDetails from '@components/authScreenComponents/ContactDetails';
import Password from '@components/authScreenComponents/Password';
import OtpVerification from '@components/authScreenComponents/OtpVerification';
import { useRouter } from 'expo-router';

const SignUp = () => {
  const styles = compactStyles(generalStyles, androidStyles, iosStyles);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const submitAccountInformation = (
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: 'Male' | 'Female'
  ) => {
    setIndex(1);
  };

  const submitContactDetails = (
    address: string,
    email: string,
    phoneNumber: string
  ) => {
    setIndex(2);
  };

  const verifyOtp = (otp: string) => {
    setIndex(3);
  };

  const submitPassword = (password: string) => {
    // setIndex(4);
    //TODO: After submitting the password, the onboarding screen shouldn't be stacked untop regular screens. It should replace the whole registration process, so back will go to the login screen directly.
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (index !== 0) {
      setIndex(index - 1);
    } else {
      router.back();
    }

    return true;
  });

  switch (index) {
    case 0:
      return <AccountInformation onSubmit={submitAccountInformation} />;
    case 1:
      return <ContactDetails onSubmit={submitContactDetails} />;
    case 2:
      return <OtpVerification email={email} onVerifyOtp={verifyOtp} />;
    case 3:
      return <Password onSubmit={submitPassword} />;
    default:
      return null;
  }
};

export default SignUp;

const generalStyles = StyleSheet.create({});

const androidStyles = StyleSheet.create({});

const iosStyles = StyleSheet.create({});
