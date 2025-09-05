import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing, fontSizes } from '../../utils/responsive';

interface AnimatedSplashProps {
  onAnimationEnd: () => void;
}

const AnimatedSplash = ({ onAnimationEnd }: AnimatedSplashProps) => {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const translateY = useSharedValue(50);

  useEffect(() => {
    // Animate logo appearance
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withSequence(
      withTiming(1.2, { duration: 600 }),
      withTiming(1, { duration: 200 })
    );
    translateY.value = withTiming(0, { duration: 800 });

    // Hide splash after animation
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(onAnimationEnd)();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value }
    ],
  }));

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={[styles.logoContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.logoText, { color: theme.colors.primary }]}>
            📝
          </Text>
        </View>
        <Text style={[styles.appName, { color: theme.colors.onPrimary }]}>
          Task Manager
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onPrimary }]}>
          Organize your life
        </Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: fontSizes.header,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  subtitle: {
    fontSize: fontSizes.l,
    opacity: 0.9,
  },
});

export default AnimatedSplash;
