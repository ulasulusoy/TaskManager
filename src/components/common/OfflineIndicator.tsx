import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Platform } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { spacing, fontSizes } from '../../utils/responsive';

const OfflineIndicator = () => {
  const theme = useTheme();
  const { isOffline } = useNetworkStatus();
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Animate when status changes
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOffline, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.badge,
        {
          backgroundColor: isOffline ? theme.colors.error : '#4CAF50', // Green for online
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>
        {isOffline ? 'OFFLINE' : 'ONLINE'}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: spacing.m,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    zIndex: 1000,
  },
  badgeText: {
    fontSize: fontSizes.xs,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default OfflineIndicator;