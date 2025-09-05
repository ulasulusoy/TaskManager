import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Switch, Divider, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackParamList } from '../../navigation/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateSettings } from '../../store/slices/settingsSlice';
import { logout } from '../../store/slices/authSlice';
import { spacing, fontSizes } from '../../utils/responsive';
import { AppButton } from '../../components/common';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector(state => state.settings);
  
  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    dispatch(updateSettings({ theme: value }));
  };
  
  const handleNotificationToggle = () => {
    dispatch(updateSettings({ notifications: !settings.notifications }));
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  
  const navigateToAbout = () => {
    navigation.navigate('About');
  };
  
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
        Appearance
      </Text>
      
      <List.Section style={styles.section}>
        <List.Item
          title="Theme"
          description="Choose your preferred theme"
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          onPress={() => {}}
        />
        
        <View style={styles.themeOptions}>
          <AppButton
            mode={settings.theme === 'light' ? 'contained' : 'outlined'}
            onPress={() => handleThemeChange('light')}
            style={styles.themeButton}
            icon="white-balance-sunny"
          >
            Light
          </AppButton>
          
          <AppButton
            mode={settings.theme === 'dark' ? 'contained' : 'outlined'}
            onPress={() => handleThemeChange('dark')}
            style={styles.themeButton}
            icon="moon-waning-crescent"
          >
            Dark
          </AppButton>
          
          <AppButton
            mode={settings.theme === 'system' ? 'contained' : 'outlined'}
            onPress={() => handleThemeChange('system')}
            style={styles.themeButton}
            icon="cellphone"
          >
            System
          </AppButton>
        </View>
      </List.Section>
      
      <Divider />
      
      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
        Notifications
      </Text>
      
      <List.Section style={styles.section}>
        <List.Item
          title="Enable Notifications"
          description="Receive alerts for task reminders"
          left={props => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch
              value={settings.notifications}
              onValueChange={handleNotificationToggle}
              color={theme.colors.primary}
            />
          )}
          onPress={handleNotificationToggle}
        />
        
        <List.Item
          title="Notification Settings"
          description="Configure notification preferences"
          left={props => <List.Icon {...props} icon="bell-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={navigateToNotifications}
        />
      </List.Section>
      
      <Divider />
      
      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
        About
      </Text>
      
      <List.Section style={styles.section}>
        <List.Item
          title="About Task Manager"
          description="Version 1.0.0"
          left={props => <List.Icon {...props} icon="information" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={navigateToAbout}
        />
      </List.Section>
      
      <Divider />
      
      <View style={styles.logoutContainer}>
        <AppButton
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          icon="logout"
        >
          Logout
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
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.m,
  },
  themeButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  logoutContainer: {
    marginTop: spacing.l,
    marginBottom: spacing.xl,
  },
  logoutButton: {
    marginHorizontal: spacing.m,
  },
});

export default SettingsScreen;
