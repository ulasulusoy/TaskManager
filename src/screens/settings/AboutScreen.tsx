import React from 'react';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import { Text, Card, List, Divider, useTheme } from 'react-native-paper';
import { spacing, fontSizes } from '../../utils/responsive';
import { AppButton } from '../../components/common';

const AboutScreen = () => {
  const theme = useTheme();
  
  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };
  
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Task Manager
          </Text>
          <Text style={[styles.version, { color: theme.colors.onSurfaceVariant }]}>
            Version 1.0.0
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            A powerful task management application built with React Native. Organize your tasks, set priorities, and never miss a deadline.
          </Text>
        </Card.Content>
      </Card>
      
      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
        Technologies Used
      </Text>
      
      <List.Section style={styles.section}>
        <List.Item
          title="React Native"
          description="Cross-platform mobile framework"
          left={props => <List.Icon {...props} icon="react" />}
        />
        
        <Divider />
        
        <List.Item
          title="Redux"
          description="State management library"
          left={props => <List.Icon {...props} icon="state-machine" />}
        />
        
        <Divider />
        
        <List.Item
          title="React Navigation"
          description="Navigation library for React Native"
          left={props => <List.Icon {...props} icon="navigation" />}
        />
        
        <Divider />
        
        <List.Item
          title="Expo"
          description="Platform for universal React applications"
          left={props => <List.Icon {...props} icon="dev-to" />}
        />
      </List.Section>
      
      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
        Features
      </Text>
      
      <List.Section style={styles.section}>
        <List.Item
          title="Task Management"
          description="Create, edit, and organize tasks"
          left={props => <List.Icon {...props} icon="checkbox-marked-outline" />}
        />
        
        <Divider />
        
        <List.Item
          title="Camera Integration"
          description="Take profile pictures with device camera"
          left={props => <List.Icon {...props} icon="camera" />}
        />
        
        <Divider />
        
        <List.Item
          title="Geolocation"
          description="Access device location information"
          left={props => <List.Icon {...props} icon="map-marker" />}
        />
        
        <Divider />
        
        <List.Item
          title="Offline Mode"
          description="Use the app without internet connection"
          left={props => <List.Icon {...props} icon="cloud-off-outline" />}
        />
      </List.Section>
      
      <View style={styles.linksContainer}>
        <AppButton
          mode="outlined"
          onPress={() => handleOpenLink('https://reactnative.dev/')}
          style={styles.linkButton}
          icon="web"
        >
          React Native Docs
        </AppButton>
        
        <AppButton
          mode="outlined"
          onPress={() => handleOpenLink('https://redux.js.org/')}
          style={styles.linkButton}
          icon="web"
        >
          Redux Docs
        </AppButton>
        
        <AppButton
          mode="outlined"
          onPress={() => handleOpenLink('https://reactnavigation.org/')}
          style={styles.linkButton}
          icon="web"
        >
          React Navigation Docs
        </AppButton>
      </View>
      
      <Text style={[styles.footer, { color: theme.colors.onSurfaceVariant }]}>
        © 2023 Task Manager App. All rights reserved.
      </Text>
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
  card: {
    marginBottom: spacing.l,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  version: {
    fontSize: fontSizes.m,
    textAlign: 'center',
    marginBottom: spacing.m,
  },
  description: {
    fontSize: fontSizes.m,
    textAlign: 'center',
    lineHeight: fontSizes.m * 1.5,
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
  linksContainer: {
    marginTop: spacing.l,
    marginBottom: spacing.l,
  },
  linkButton: {
    marginBottom: spacing.s,
  },
  footer: {
    fontSize: fontSizes.s,
    textAlign: 'center',
    marginBottom: spacing.m,
  },
});

export default AboutScreen;
