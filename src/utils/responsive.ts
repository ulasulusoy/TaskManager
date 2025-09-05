import React from 'react';
import { Dimensions, PixelRatio, Platform, ScaledSize } from 'react-native';

// Screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (based on a standard iPhone 11)
const baseWidth = 375;
const baseHeight = 812;

// Scaling factors
const widthScale = SCREEN_WIDTH / baseWidth;
const heightScale = SCREEN_HEIGHT / baseHeight;

/**
 * Scale a value horizontally based on screen width
 * @param size - Size to scale
 */
export const horizontalScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * widthScale);
};

/**
 * Scale a value vertically based on screen height
 * @param size - Size to scale
 */
export const verticalScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * heightScale);
};

/**
 * Scale a value moderately - more for font sizes
 * @param size - Size to scale
 * @param factor - Factor to moderate the scaling (default: 0.5)
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return PixelRatio.roundToNearestPixel(size + (horizontalScale(size) - size) * factor);
};

/**
 * Hook to get dimensions and respond to dimension changes
 */
export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = React.useState<ScaledSize>(Dimensions.get('window'));

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const isPortrait = dimensions.height > dimensions.width;
  const isTablet = Math.max(dimensions.width, dimensions.height) > 900;

  return {
    width: dimensions.width,
    height: dimensions.height,
    isPortrait,
    isLandscape: !isPortrait,
    isTablet,
    isPhone: !isTablet,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
  };
};

// Common spacing values
export const spacing = {
  xs: horizontalScale(4),
  s: horizontalScale(8),
  m: horizontalScale(16),
  l: horizontalScale(24),
  xl: horizontalScale(32),
  xxl: horizontalScale(48),
};

// Common font sizes
export const fontSizes = {
  xs: moderateScale(10),
  s: moderateScale(12),
  m: moderateScale(14),
  l: moderateScale(16),
  xl: moderateScale(18),
  xxl: moderateScale(20),
  xxxl: moderateScale(24),
  title: moderateScale(28),
  header: moderateScale(32),
};
