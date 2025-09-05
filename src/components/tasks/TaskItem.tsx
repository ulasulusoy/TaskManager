import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, Checkbox, IconButton, useTheme } from 'react-native-paper';
import { Task } from '../../types';
import { spacing, fontSizes } from '../../utils/responsive';

interface TaskItemProps {
  task: Task;
  onPress: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onPress, onToggleComplete, onDelete }: TaskItemProps) => {
  const theme = useTheme();
  
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
  
  const priorityColor = getPriorityColor();
  
  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surfaceVariant,
          borderLeftColor: priorityColor,
          opacity: task.completed ? 0.8 : 1,
        },
      ]}
      mode="outlined"
    >
      <TouchableOpacity onPress={() => onPress(task)} activeOpacity={0.7}>
        <Card.Content style={styles.content}>
          <View style={styles.leftContent}>
            <Checkbox
              status={task.completed ? 'checked' : 'unchecked'}
              onPress={() => onToggleComplete(task)}
              color={theme.colors.primary}
              testID="task-checkbox"
            />
            
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.colors.onSurface,
                    textDecorationLine: task.completed ? 'line-through' : 'none',
                  },
                ]}
                numberOfLines={1}
                testID="task-title"
              >
                {task.title}
              </Text>
              
              {task.description ? (
                <Text
                  style={[
                    styles.description,
                    {
                      color: theme.colors.onSurfaceVariant,
                      textDecorationLine: task.completed ? 'line-through' : 'none',
                    },
                  ]}
                  numberOfLines={2}
                >
                  {task.description}
                </Text>
              ) : null}
              
              {task.dueDate ? (
                <Text style={[styles.dueDate, { color: theme.colors.onSurfaceVariant }]}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </Text>
              ) : null}
            </View>
          </View>
          
          <IconButton
            icon="delete-outline"
            size={20}
            onPress={() => onDelete(task.id)}
            iconColor={theme.colors.error}
            testID="delete-button"
          />
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.xs,
    borderLeftWidth: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing.s,
  },
  title: {
    fontSize: fontSizes.l,
    fontWeight: '500',
  },
  description: {
    fontSize: fontSizes.s,
    marginTop: spacing.xs,
  },
  dueDate: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});

export default TaskItem;
