import React from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { List, Switch, Divider, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackParamList } from '../../navigation/types';
import { spacing, fontSizes } from '../../utils/responsive';
import { AppButton } from '../../components/common';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Notifications'>;

const NotificationsScreen = () => {
  const theme = useTheme();
  
  // In a real app, these would be connected to Redux or another state management solution
  const [taskReminders, setTaskReminders] = React.useState(true);
  const [dueDateAlerts, setDueDateAlerts] = React.useState(true);
  const [completionNotifications, setCompletionNotifications] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);
  
  const handleTestNotification = () => {
    Alert.alert(
      'Test Notification',
      'This is how a notification would appear in your app. In a real implementation, this would be sent through a notification service.',
      [
        { text: 'Dismiss', style: 'cancel' },
        { text: 'OK', style: 'default' }
      ]
    );
  };
  
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
        Notification Types
      </Text>
      
      <List.Section style={styles.section}>
        <List.Item
          title="Task Reminders"
          description="Receive reminders for upcoming tasks"
          left={props => <List.Icon {...props} icon="calendar-clock" />}
          right={() => (
            <Switch
              value={taskReminders}
              onValueChange={setTaskReminders}
              color={theme.colors.primary}
            />
          )}
          onPress={() => setTaskReminders(!taskReminders)}
        />
        
        <Divider />
        
        <List.Item
          title="Due Date Alerts"
          description="Get notified when tasks are due"
          left={props => <List.Icon {...props} icon="calendar-alert" />}
          right={() => (
            <Switch
              value={dueDateAlerts}
              onValueChange={setDueDateAlerts}
              color={theme.colors.primary}
            />
          )}
          onPress={() => setDueDateAlerts(!dueDateAlerts)}
        />
        
        <Divider />
        
        <List.Item
          title="Task Completion"
          description="Notifications when tasks are completed"
          left={props => <List.Icon {...props} icon="check-circle" />}
          right={() => (
            <Switch
              value={completionNotifications}
              onValueChange={setCompletionNotifications}
              color={theme.colors.primary}
            />
          )}
          onPress={() => setCompletionNotifications(!completionNotifications)}
        />
      </List.Section>
      
      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
        Notification Settings
      </Text>
      
      <List.Section style={styles.section}>
        <List.Item
          title="Sound"
          description="Play sound with notifications"
          left={props => <List.Icon {...props} icon="volume-high" />}
          right={() => (
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              color={theme.colors.primary}
            />
          )}
          onPress={() => setSoundEnabled(!soundEnabled)}
        />
        
        <Divider />
        
        <List.Item
          title="Vibration"
          description="Vibrate with notifications"
          left={props => <List.Icon {...props} icon="vibrate" />}
          right={() => (
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              color={theme.colors.primary}
            />
          )}
          onPress={() => setVibrationEnabled(!vibrationEnabled)}
        />
      </List.Section>
      
      <View style={styles.testContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Test Notifications
        </Text>
        
        <AppButton
          mode="contained"
          onPress={handleTestNotification}
          style={styles.testButton}
          icon="bell-ring"
        >
          Send Test Notification
        </AppButton>
      </View>
      
      <View style={styles.noteContainer}>
        <Text style={[styles.noteText, { color: theme.colors.onSurfaceVariant }]}>
          Note: Notification settings are simulated in this demo app. In a production app, these would be connected to actual device notification settings and a backend service.
        </Text>
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
  sectionTitle: {
    fontSize: fontSizes.l,
    fontWeight: '500',
    marginTop: spacing.m,
    marginBottom: spacing.s,
    paddingHorizontal: spacing.s,
  },
  section: {
    marginBottom: spacing.m,
  },
  testContainer: {
    padding: spacing.m,
    marginTop: spacing.m,
    alignItems: 'center',
  },
  testButton: {
    marginTop: spacing.s,
    minWidth: 200,
  },
  noteContainer: {
    padding: spacing.m,
    marginTop: spacing.m,
  },
  noteText: {
    fontSize: fontSizes.s,
    fontStyle: 'italic',
  },
});

export default NotificationsScreen;
