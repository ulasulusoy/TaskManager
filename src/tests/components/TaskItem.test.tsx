import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { MD3LightTheme } from 'react-native-paper';
import TaskItem from '../../components/tasks/TaskItem';

// Mock task data
const mockTask = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task',
  completed: false,
  priority: 'medium' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: '1',
};

// Mock functions
const mockOnPress = jest.fn();
const mockOnToggleComplete = jest.fn();
const mockOnDelete = jest.fn();

describe('TaskItem Component', () => {
  const renderComponent = () =>
    render(
      <PaperProvider theme={MD3LightTheme}>
        <TaskItem
          task={mockTask}
          onPress={mockOnPress}
          onToggleComplete={mockOnToggleComplete}
          onDelete={mockOnDelete}
        />
      </PaperProvider>
    );

  it('renders correctly with task data', () => {
    const { getByText } = renderComponent();
    
    // Check if task title and description are rendered
    expect(getByText(mockTask.title)).toBeTruthy();
    expect(getByText(mockTask.description)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = renderComponent();
    
    // Press the task title to trigger onPress
    fireEvent.press(getByText(mockTask.title));
    
    // Check if onPress was called with the task
    expect(mockOnPress).toHaveBeenCalledWith(mockTask);
  });

  it('calls onToggleComplete when checkbox is pressed', () => {
    const { getByTestId } = renderComponent();
    
    // Find and press the checkbox
    // Note: This assumes we've added a testID to the Checkbox component
    fireEvent.press(getByTestId('task-checkbox'));
    
    // Check if onToggleComplete was called with the task
    expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDelete when delete button is pressed', () => {
    const { getByTestId } = renderComponent();
    
    // Find and press the delete button
    // Note: This assumes we've added a testID to the delete button
    fireEvent.press(getByTestId('delete-button'));
    
    // Check if onDelete was called with the task ID
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('shows completed styling when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    
    const { getByTestId } = render(
      <PaperProvider theme={MD3LightTheme}>
        <TaskItem
          task={completedTask}
          onPress={mockOnPress}
          onToggleComplete={mockOnToggleComplete}
          onDelete={mockOnDelete}
        />
      </PaperProvider>
    );
    
    // Check if the title has the completed style (line-through)
    // Note: This assumes we've added a testID to the title Text component
    const titleElement = getByTestId('task-title');
    expect(titleElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          textDecorationLine: 'line-through',
        }),
      ])
    );
  });
});
