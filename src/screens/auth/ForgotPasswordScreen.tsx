import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, useTheme, Snackbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { AppButton, AppTextInput } from '../../components/common';
import { spacing, fontSizes, horizontalScale } from '../../utils/responsive';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const handleResetPassword = () => {
    if (!email.trim()) {
      setSnackbarMessage('Please enter your email address');
      setSnackbarVisible(true);
      return;
    }
    
    // In a real app, this would call an API
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSnackbarMessage('Password reset instructions sent to your email');
      setSnackbarVisible(true);
      
      // Navigate back to login after a delay
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    }, 1500);
  };
  
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Forgot Password</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
            Enter your email to reset your password
          </Text>
        </View>
        
        <View style={styles.form}>
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <AppButton
            mode="contained"
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            Reset Password
          </AppButton>
          
          <AppButton
            mode="text"
            onPress={navigateToLogin}
            style={styles.textButton}
          >
            Back to Sign In
          </AppButton>
        </View>
      </ScrollView>
      
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSizes.header,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  subtitle: {
    fontSize: fontSizes.l,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: horizontalScale(400),
    alignSelf: 'center',
  },
  button: {
    marginTop: spacing.m,
  },
  textButton: {
    marginTop: spacing.s,
  },
});

export default ForgotPasswordScreen;
