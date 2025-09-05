import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { spacing } from '../../utils/responsive';

interface AppTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: boolean;
  errorText?: string;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const AppTextInput = ({
  label,
  value,
  onChangeText,
  style,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error = false,
  errorText,
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  left,
  right,
}: AppTextInputProps) => {
  const theme = useTheme();
  
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      error={error}
      multiline={multiline}
      numberOfLines={numberOfLines}
      disabled={disabled}
      left={left}
      right={right}
      mode="outlined"
      theme={theme}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: spacing.m,
  },
});

export default AppTextInput;
