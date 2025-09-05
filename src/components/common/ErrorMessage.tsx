import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { spacing, fontSizes } from '../../utils/responsive';

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const theme = useTheme();
  
  if (!message) return null;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.error }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.s,
    marginBottom: spacing.m,
  },
  text: {
    fontSize: fontSizes.m,
    textAlign: 'center',
  },
});

export default ErrorMessage;
