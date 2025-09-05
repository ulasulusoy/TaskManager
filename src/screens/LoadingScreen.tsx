import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { AnimatedSplash } from '../components/common';
import { spacing, fontSizes } from '../utils/responsive';

const LoadingScreen = () => {
  const theme = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  
  if (showSplash) {
    return <AnimatedSplash onAnimationEnd={() => setShowSplash(false)} />;
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={[styles.text, { color: theme.colors.onBackground }]}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: spacing.m,
    fontSize: fontSizes.l,
  },
});

export default LoadingScreen;
