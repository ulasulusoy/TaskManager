import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { AppButton, AppTextInput, ErrorMessage } from '../../components/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login, clearError } from '../../store/slices/authSlice';
import { spacing, fontSizes, horizontalScale } from '../../utils/responsive';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      dispatch(login({ email, password }));
    }
  };
  
  const navigateToRegister = () => {
    dispatch(clearError());
    navigation.navigate('Register');
  };
  
  const navigateToForgotPassword = () => {
    dispatch(clearError());
    navigation.navigate('ForgotPassword');
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
          <Text style={[styles.title, { color: theme.colors.primary }]}>Task Manager</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
            Sign in to your account
          </Text>
        </View>
        
        <View style={styles.form}>
          <ErrorMessage message={error} />
          
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <AppButton
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            Sign In
          </AppButton>
          
          <AppButton
            mode="text"
            onPress={navigateToForgotPassword}
            style={styles.textButton}
          >
            Forgot Password?
          </AppButton>
        </View>
        
        <View style={styles.footer}>
          <Text style={{ color: theme.colors.onBackground }}>Don't have an account? </Text>
          <AppButton mode="text" onPress={navigateToRegister}>
            Sign Up
          </AppButton>
        </View>
      </ScrollView>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
});

export default LoginScreen;
