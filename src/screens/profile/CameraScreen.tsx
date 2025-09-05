import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text as RNText, TouchableOpacity, Alert } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useAppDispatch } from '../../hooks';
import { updateUser } from '../../store/slices/authSlice';
import { spacing } from '../../utils/responsive';
import { AppButton } from '../../components/common';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Camera'>;

const CameraScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  
  useEffect(() => {
    // Request camera permission on mount
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);
  
  const handleCameraFlip = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const handleTakePicture = async () => {
    try {
      if (!cameraRef.current) {
        Alert.alert('Error', 'Camera not ready. Please try again.');
        return;
      }

      // Take picture using CameraView
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        exif: false,
      });

      if (photo && photo.uri) {
        // Update user profile with new photo
        dispatch(updateUser({ profileImage: photo.uri }));
        
        // Navigate back to profile
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };
  
  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled && result.assets[0]) {
        // Update user profile with new photo
        dispatch(updateUser({ profileImage: result.assets[0].uri }));
        
        // Navigate back to profile
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <RNText style={{ color: theme.colors.onBackground }}>
          Loading camera permissions...
        </RNText>
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <RNText style={{ color: theme.colors.onBackground, textAlign: 'center', marginBottom: spacing.m }}>
          We need your permission to show the camera
        </RNText>
        <AppButton mode="contained" onPress={requestPermission}>
          Grant Permission
        </AppButton>
        <AppButton mode="outlined" onPress={handleCancel} style={{ marginTop: spacing.m }}>
          Cancel
        </AppButton>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.controlsContainer}>
          <IconButton
            icon="close"
            iconColor={theme.colors.onPrimary}
            size={30}
            onPress={handleCancel}
            style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <IconButton
            icon="image"
            iconColor={theme.colors.onPrimary}
            size={30}
            onPress={handlePickFromGallery}
            style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          />
          
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePicture}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>
          
          <IconButton
            icon="camera-flip"
            iconColor={theme.colors.onPrimary}
            size={30}
            onPress={handleCameraFlip}
            style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          />
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  controlsContainer: {
    position: 'absolute',
    top: spacing.m,
    left: spacing.m,
    zIndex: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    padding: spacing.l,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});

export default CameraScreen;