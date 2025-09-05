import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, useTheme, Avatar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateUser } from '../../store/slices/authSlice';
import { spacing, fontSizes } from '../../utils/responsive';
import { AppButton, AppTextInput } from '../../components/common';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

const EditProfileScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    // Validate username
    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    return isValid;
  };
  
  const handleSave = () => {
    if (validateForm() && user) {
      dispatch(updateUser({ username, email }));
      navigation.goBack();
    }
  };
  
  const handleChangePhoto = () => {
    navigation.navigate('Camera');
  };
  
  if (!user) return null;
  
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatarContainer}>
          {user.profileImage ? (
            <Image 
              source={{ uri: user.profileImage }} 
              style={styles.avatar} 
            />
          ) : (
            <Avatar.Icon 
              size={100} 
              icon="account" 
              style={[styles.avatarIcon, { backgroundColor: theme.colors.primary }]} 
            />
          )}
          
          <AppButton 
            mode="outlined" 
            onPress={handleChangePhoto} 
            style={styles.photoButton}
            icon="camera"
          >
            Change Photo
          </AppButton>
        </View>
        
        <View style={styles.form}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Edit Profile
          </Text>
          
          <AppTextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            error={!!usernameError}
            errorText={usernameError}
          />
          
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!emailError}
            errorText={emailError}
          />
          
          <View style={styles.buttonContainer}>
            <AppButton
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
            >
              Save Changes
            </AppButton>
            
            <AppButton
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
            >
              Cancel
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.m,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.s,
  },
  avatarIcon: {
    marginBottom: spacing.s,
  },
  photoButton: {
    marginTop: spacing.s,
  },
  form: {
    width: '100%',
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: spacing.l,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: spacing.l,
  },
  saveButton: {
    marginBottom: spacing.m,
  },
  cancelButton: {},
});

export default EditProfileScreen;
