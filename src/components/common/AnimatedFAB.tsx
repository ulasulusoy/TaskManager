import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { spacing } from '../../utils/responsive';

interface AnimatedFABProps {
  icon: string;
  onPress: () => void;
  style?: any;
}

const AnimatedFAB = ({ icon, onPress, style }: AnimatedFABProps) => {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const handlePress = () => {
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Animation
    scale.value = withSequence(
      withSpring(0.9, { duration: 100 }),
      withSpring(1.1, { duration: 100 }),
      withSpring(1, { duration: 100 })
    );
    
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <FAB
        icon={icon}
        onPress={handlePress}
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.primary,
          },
        ]}
        color={theme.colors.onPrimary}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    margin: spacing.m,
    right: 0,
    bottom: 0,
  },
  fab: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default AnimatedFAB;
