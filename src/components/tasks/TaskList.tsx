import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Task } from '../../types';
import TaskItem from './TaskItem';
import EnhancedTaskItem from './EnhancedTaskItem';
import { spacing, fontSizes } from '../../utils/responsive';

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const TaskList = ({
  tasks,
  onTaskPress,
  onToggleComplete,
  onDeleteTask,
  refreshing = false,
  onRefresh,
}: TaskListProps) => {
  const theme = useTheme();
  
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
          No tasks found. Add a new task to get started!
        </Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <EnhancedTaskItem
          task={item}
          onPress={onTaskPress}
          onToggleComplete={onToggleComplete}
          onDelete={onDeleteTask}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.m,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: fontSizes.l,
    textAlign: 'center',
  },
});

export default TaskList;
