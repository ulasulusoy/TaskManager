import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Chip, Searchbar, useTheme } from 'react-native-paper';
import { TasksState } from '../../types';
import { spacing } from '../../utils/responsive';

interface TaskFilterProps {
  filter: TasksState['filter'];
  onFilterChange: (filter: Partial<TasksState['filter']>) => void;
}

const TaskFilter = ({ filter, onFilterChange }: TaskFilterProps) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search tasks"
        onChangeText={text => onFilterChange({ searchQuery: text })}
        value={filter.searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
      />
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipContainer}
      >
        <Chip
          selected={filter.status === 'all'}
          onPress={() => onFilterChange({ status: 'all' })}
          style={styles.chip}
          showSelectedOverlay
        >
          All
        </Chip>
        <Chip
          selected={filter.status === 'active'}
          onPress={() => onFilterChange({ status: 'active' })}
          style={styles.chip}
          showSelectedOverlay
        >
          Active
        </Chip>
        <Chip
          selected={filter.status === 'completed'}
          onPress={() => onFilterChange({ status: 'completed' })}
          style={styles.chip}
          showSelectedOverlay
        >
          Completed
        </Chip>
        
        <View style={styles.divider} />
        
        <Chip
          selected={filter.priority === 'all'}
          onPress={() => onFilterChange({ priority: 'all' })}
          style={styles.chip}
          showSelectedOverlay
        >
          All Priorities
        </Chip>
        <Chip
          selected={filter.priority === 'high'}
          onPress={() => onFilterChange({ priority: 'high' })}
          style={styles.chip}
          showSelectedOverlay
        >
          High
        </Chip>
        <Chip
          selected={filter.priority === 'medium'}
          onPress={() => onFilterChange({ priority: 'medium' })}
          style={styles.chip}
          showSelectedOverlay
        >
          Medium
        </Chip>
        <Chip
          selected={filter.priority === 'low'}
          onPress={() => onFilterChange({ priority: 'low' })}
          style={styles.chip}
          showSelectedOverlay
        >
          Low
        </Chip>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.m,
  },
  searchBar: {
    marginBottom: spacing.m,
  },
  chipContainer: {
    paddingVertical: spacing.xs,
  },
  chip: {
    marginRight: spacing.s,
  },
  divider: {
    width: 1,
    height: '80%',
    marginHorizontal: spacing.s,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default TaskFilter;
