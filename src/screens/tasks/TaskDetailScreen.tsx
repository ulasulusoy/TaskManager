import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Divider, Chip, IconButton, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList } from '../../navigation/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateTask, deleteTask } from '../../store/slices/tasksSlice';
import { spacing, fontSizes } from '../../utils/responsive';
import { AppButton } from '../../components/common';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskDetail'>;

const TaskDetailScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { taskId } = route.params;
  
  // Get task from store
  const task = useAppSelector(state => 
    state.tasks.tasks.find(t => t.id === taskId)
  );
  
  // If task not found, go back
  if (!task) {
    navigation.goBack();
    return null;
  }
  
  const handleToggleComplete = () => {
    dispatch(updateTask({ id: taskId, updates: { completed: !task.completed } }));
  };
  
  const handleEditTask = () => {
    navigation.navigate('AddEditTask', { task });
  };
  
  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId));
    navigation.goBack();
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Determine priority color
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning || '#FFA500';
      case 'low':
        return theme.colors.success || '#4CAF50';
      default:
        return theme.colors.primary;
    }
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              {task.title}
            </Text>
            
            <Chip 
              style={[styles.statusChip, { 
                backgroundColor: task.completed 
                  ? theme.colors.success || '#4CAF50' 
                  : theme.colors.primary 
              }]}
            >
              {task.completed ? 'Completed' : 'Active'}
            </Chip>
          </View>
          
          <Divider style={styles.divider} />
          
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            {task.description || 'No description provided'}
          </Text>
          
          <Divider style={styles.divider} />
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                Priority:
              </Text>
              <Chip 
                style={[styles.priorityChip, { backgroundColor: getPriorityColor() }]}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Chip>
            </View>
            
            {task.dueDate && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Due Date:
                </Text>
                <Text style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </Text>
              </View>
            )}
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                Created:
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                {formatDate(task.createdAt)}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                Last Updated:
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                {formatDate(task.updatedAt)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      <View style={styles.buttonContainer}>
        <AppButton
          mode="contained"
          onPress={handleToggleComplete}
          style={[styles.button, { backgroundColor: task.completed ? theme.colors.error : theme.colors.primary }]}
        >
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </AppButton>
        
        <View style={styles.actionButtons}>
          <IconButton
            icon="pencil"
            mode="contained"
            containerColor={theme.colors.secondary}
            iconColor={theme.colors.onSecondary}
            size={24}
            onPress={handleEditTask}
            style={styles.iconButton}
          />
          
          <IconButton
            icon="delete"
            mode="contained"
            containerColor={theme.colors.error}
            iconColor={theme.colors.onError}
            size={24}
            onPress={handleDeleteTask}
            style={styles.iconButton}
          />
        </View>
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
  card: {
    marginBottom: spacing.m,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    flex: 1,
  },
  statusChip: {
    marginLeft: spacing.s,
  },
  divider: {
    marginVertical: spacing.m,
  },
  sectionTitle: {
    fontSize: fontSizes.l,
    fontWeight: '500',
    marginBottom: spacing.s,
  },
  description: {
    fontSize: fontSizes.m,
    lineHeight: fontSizes.m * 1.5,
  },
  detailsContainer: {
    marginTop: spacing.s,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  detailLabel: {
    fontSize: fontSizes.m,
    fontWeight: '500',
    width: 100,
  },
  detailValue: {
    fontSize: fontSizes.m,
    flex: 1,
  },
  priorityChip: {
    height: 28,
  },
  buttonContainer: {
    marginTop: spacing.m,
  },
  button: {
    marginBottom: spacing.m,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    marginHorizontal: spacing.s,
  },
});

export default TaskDetailScreen;
