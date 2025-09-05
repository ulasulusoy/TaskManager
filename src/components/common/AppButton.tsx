import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { spacing } from '../../utils/responsive';

interface AppButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  children: React.ReactNode;
}

const AppButton = ({
  mode = 'contained',
  onPress,
  style,
  disabled = false,
  loading = false,
  icon,
  children,
}: AppButtonProps) => {
  const theme = useTheme();
  
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
      loading={loading}
      icon={icon}
      labelStyle={styles.label}
      theme={theme}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: spacing.s,
    paddingVertical: spacing.xs,
  },
  label: {
    paddingVertical: spacing.xs,
  },
});

export default AppButton;
