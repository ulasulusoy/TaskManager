import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Text, Card, Divider, useTheme, Avatar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateUser } from '../../store/slices/authSlice';
import { spacing, fontSizes } from '../../utils/responsive';
import { AppButton } from '../../components/common';
import * as Location from 'expo-location';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>(null);
  
  useEffect(() => {
    // Request location permission and get current location
    const getLocation = async () => {
      try {
        setLocationError('Checking location permissions...');

        // First check if location services are enabled
        const isLocationEnabled = await Location.hasServicesEnabledAsync();
        if (!isLocationEnabled) {
          setLocationError('Location services are disabled. Please enable GPS in your device settings and restart the app.');
          return;
        }

        // Check current permission status
        const { status: currentStatus } = await Location.getForegroundPermissionsAsync();
        
        if (currentStatus !== 'granted') {
          // Request foreground permissions
          setLocationError('Requesting location permission...');
          const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
          
          if (newStatus !== 'granted') {
            setLocationError('Location permission denied. Please go to Settings > Apps > TaskManager > Permissions > Location and enable "Allow all the time" or "Allow only while using app".');
            return;
          }
        }

        // Get current position with balanced accuracy for better reliability
        setLocationError('Getting your location...');
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          maximumAge: 10000, // Accept location up to 10 seconds old
          timeout: 15000, // Timeout after 15 seconds
        });
        
        setLocation(currentLocation);
        
        // Get address information from coordinates
        setLocationError('Getting address information...');
        const addressInfo = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        
        if (addressInfo && addressInfo.length > 0) {
          setAddress(addressInfo[0]);
        }
        
        setLocationError(null);
      } catch (error) {
        console.error('Location error:', error);
        if (error.message.includes('permission')) {
          setLocationError('Location permission required. Please enable location access in app settings and restart the app.');
        } else if (error.message.includes('timeout')) {
          setLocationError('Location timeout. Please make sure you are outdoors or near a window and try again.');
        } else {
          setLocationError('Unable to get location. Please check GPS settings and try refreshing.');
        }
      }
    };

    getLocation();
  }, []);
  
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  
  const handleChangePhoto = () => {
    navigation.navigate('Camera');
  };

  const handleRefreshLocation = async () => {
    try {
      setLocationError('Refreshing location...');
      
      // Check permission again
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission required. Please enable in app settings.');
        return;
      }

      // Try to get fresh location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        maximumAge: 1000, // Force fresh location
        timeout: 10000,
      });
      
      setLocation(currentLocation);
      
      // Get address information
      setLocationError('Getting address information...');
      const addressInfo = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      
      if (addressInfo && addressInfo.length > 0) {
        setAddress(addressInfo[0]);
      }
      
      setLocationError(null);
    } catch (error) {
      console.error('Location refresh error:', error);
      if (error.message.includes('permission')) {
        setLocationError('Location permission required. Please check app settings.');
      } else if (error.message.includes('timeout')) {
        setLocationError('Location timeout. Move to an open area and try again.');
      } else {
        setLocationError('Unable to refresh location. Check GPS and try again.');
      }
    }
  };

  
  if (!user) return null;
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
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
          
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: theme.colors.onSurface }]}>
              {user.username}
            </Text>
            <Text style={[styles.email, { color: theme.colors.onSurfaceVariant }]}>
              {user.email}
            </Text>
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              Location Information
            </Text>
            <AppButton
              mode="outlined"
              onPress={handleRefreshLocation}
              style={styles.refreshButton}
              icon="refresh"
              compact
            >
              Refresh
            </AppButton>
          </View>
          
          <Divider style={styles.divider} />
          
          {locationError ? (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {locationError}
            </Text>
          ) : address ? (
            <View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  📍 Address:
                </Text>
                <Text style={[styles.infoValue, styles.addressText, { color: theme.colors.onSurface }]}>
                  {[address.street, address.streetNumber].filter(Boolean).join(' ') || 'Unknown'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  🏙️ City:
                </Text>
                <Text style={[styles.infoValue, styles.addressText, { color: theme.colors.onSurface }]}>
                  {address.city || 'Unknown'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  🗺️ District:
                </Text>
                <Text style={[styles.infoValue, styles.addressText, { color: theme.colors.onSurface }]}>
                  {address.district || address.subregion || 'Unknown'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  🏴 Region:
                </Text>
                <Text style={[styles.infoValue, styles.addressText, { color: theme.colors.onSurface }]}>
                  {address.region || 'Unknown'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                  🌍 Country:
                </Text>
                <Text style={[styles.infoValue, styles.addressText, { color: theme.colors.onSurface }]}>
                  {address.country || 'Unknown'}
                </Text>
              </View>
              
              {address.postalCode && (
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                    📮 Postal Code:
                  </Text>
                  <Text style={[styles.infoValue, styles.addressText, { color: theme.colors.onSurface }]}>
                    {address.postalCode}
                  </Text>
                </View>
              )}

              <Divider style={styles.divider} />
              
              {location && (
                <>
                  <Text style={[styles.coordinatesHeader, { color: theme.colors.primary }]}>
                    GPS Coordinates
                  </Text>
                  
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                      Latitude:
                    </Text>
                    <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                      {location.coords.latitude.toFixed(6)}
                    </Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                      Longitude:
                    </Text>
                    <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                      {location.coords.longitude.toFixed(6)}
                    </Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                      Accuracy:
                    </Text>
                    <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                      {location.coords.accuracy ? `±${location.coords.accuracy.toFixed(1)}m` : 'Unknown'}
                    </Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
                      Last Updated:
                    </Text>
                    <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
                      {new Date(location.timestamp).toLocaleString()}
                    </Text>
                  </View>
                </>
              )}
            </View>
          ) : (
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Getting location...
            </Text>
          )}
        </Card.Content>
      </Card>
      
      <View style={styles.buttonContainer}>
        <AppButton
          mode="contained"
          onPress={handleEditProfile}
          style={styles.editButton}
        >
          Edit Profile
        </AppButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.m,
  },
  card: {
    marginBottom: spacing.m,
  },
  cardContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.m,
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
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: fontSizes.m,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  sectionTitle: {
    fontSize: fontSizes.l,
    fontWeight: '500',
  },
  refreshButton: {
    minWidth: 80,
  },
  addressText: {
    fontWeight: '500',
  },
  coordinatesHeader: {
    fontSize: fontSizes.m,
    fontWeight: '600',
    marginBottom: spacing.s,
  },
  divider: {
    marginBottom: spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.s,
  },
  infoLabel: {
    fontSize: fontSizes.m,
    fontWeight: '500',
    width: 100,
  },
  infoValue: {
    fontSize: fontSizes.m,
    flex: 1,
  },
  errorText: {
    fontSize: fontSizes.m,
    marginBottom: spacing.m,
  },
  buttonContainer: {
    marginTop: spacing.s,
  },
  editButton: {},
});

export default ProfileScreen;
