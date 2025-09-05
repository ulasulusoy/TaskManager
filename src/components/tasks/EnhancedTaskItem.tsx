import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, Checkbox, IconButton, useTheme, Chip } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Task } from '../../types';
import { spacing, fontSizes } from '../../utils/responsive';

interface EnhancedTaskItemProps {
  task: Task;
  onPress: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const EnhancedTaskItem = ({ task, onPress, onToggleComplete, onDelete }: EnhancedTaskItemProps) => {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSequence(
      withSpring(0.98, { duration: 100 }),
      withSpring(1, { duration: 100 })
    );
    onPress(task);
  };

  const handleToggleComplete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    opacity.value = withTiming(task.completed ? 1 : 0.7, { duration: 300 });
    onToggleComplete(task);
  };

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    scale.value = withTiming(0, { duration: 200 });
    opacity.value = withTiming(0, { duration: 200 });
    setTimeout(() => onDelete(task.id), 200);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFD93D';
      case 'low':
        return '#6BCF7F';
      default:
        return theme.colors.primary;
    }
  };

  const getPriorityGradient = () => {
    const baseColor = getPriorityColor();
    return [baseColor + '20', baseColor + '10'];
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} mode="elevated">
          <LinearGradient
            colors={getPriorityGradient()}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Card.Content style={styles.content}>
              <View style={styles.leftContent}>
                <Checkbox
                  status={task.completed ? 'checked' : 'unchecked'}
                  onPress={handleToggleComplete}
                  color={getPriorityColor()}
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
                  
                  <View style={styles.metaContainer}>
                    <Chip
                      style={[styles.priorityChip, { backgroundColor: getPriorityColor() }]}
                      textStyle={styles.chipText}
                      compact
                    >
                      {task.priority.toUpperCase()}
                    </Chip>
                    
                    {task.dueDate ? (
                      <Text style={[styles.dueDate, { color: theme.colors.onSurfaceVariant }]}>
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
              
              <IconButton
                icon="delete-outline"
                size={20}
                onPress={handleDelete}
                iconColor={theme.colors.error}
                testID="delete-button"
                style={styles.deleteButton}
              />
            </Card.Content>
          </LinearGradient>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  card: {
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    flex: 1,
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
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSizes.s,
    marginBottom: spacing.xs,
    lineHeight: fontSizes.s * 1.4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  priorityChip: {
    height: 24,
    marginRight: spacing.s,
  },
  chipText: {
    fontSize: fontSizes.xs,
    color: '#fff',
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: fontSizes.xs,
  },
  deleteButton: {
    margin: 0,
  },
});

export default EnhancedTaskItem;
