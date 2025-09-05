import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { AppButton, AppTextInput, ErrorMessage } from '../../components/common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { register, clearError } from '../../store/slices/authSlice';
import { spacing, fontSizes, horizontalScale } from '../../utils/responsive';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const handleRegister = () => {
    // Reset error
    setPasswordError(null);
    
    // Validate inputs
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setPasswordError('All fields are required');
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Register user
    dispatch(register({ username, email, password }));
  };
  
  const navigateToLogin = () => {
    dispatch(clearError());
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
          <Text style={[styles.title, { color: theme.colors.primary }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
            Sign up to get started
          </Text>
        </View>
        
        <View style={styles.form}>
          <ErrorMessage message={error || passwordError} />
          
          <AppTextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
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
          
          <AppTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <AppButton
            mode="contained"
            onPress={handleRegister}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            Sign Up
          </AppButton>
        </View>
        
        <View style={styles.footer}>
          <Text style={{ color: theme.colors.onBackground }}>Already have an account? </Text>
          <AppButton mode="text" onPress={navigateToLogin}>
            Sign In
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
});

export default RegisterScreen;
