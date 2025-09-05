import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, useTheme, SegmentedButtons, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TasksStackParamList } from '../../navigation/types';
import { AppButton, AppTextInput } from '../../components/common';
import { useAppDispatch } from '../../hooks';
import { addTask, updateTask } from '../../store/slices/tasksSlice';
import { spacing, fontSizes } from '../../utils/responsive';
import { Task } from '../../types';

type Props = NativeStackScreenProps<TasksStackParamList, 'AddEditTask'>;

const AddEditTaskScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { task } = route.params || {};
  const isEditing = !!task;
  
  // Form state
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<Task['priority']>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate) : undefined
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleError, setTitleError] = useState('');
  
  // Validate form on changes
  useEffect(() => {
    if (title) setTitleError('');
  }, [title]);
  
  const handleSave = () => {
    // Validate form
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    
    if (isEditing && task) {
      // Update existing task
      dispatch(
        updateTask({
          id: task.id,
          updates: {
            title,
            description,
            priority,
            dueDate: dueDate?.toISOString(),
          },
        })
      );
    } else {
      // Add new task
      dispatch(
        addTask({
          title,
          description,
          completed: false,
          priority,
          dueDate: dueDate?.toISOString(),
          userId: '1', // In a real app, this would be the current user's ID
        })
      );
    }
    
    navigation.goBack();
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Android'de otomatik kapanmaz, iOS'ta otomatik kapanır
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setDueDate(selectedDate);
      if (Platform.OS === 'ios') {
        setShowDatePicker(false);
      }
    }
  };
  
  const handleClearDueDate = () => {
    setDueDate(undefined);
  };
  
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </Text>
          
          <AppTextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            error={!!titleError}
            errorText={titleError}
          />
          
          <AppTextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          
          <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Priority
          </Text>
          
          <SegmentedButtons
            value={priority}
            onValueChange={value => setPriority(value as Task['priority'])}
            buttons={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
            style={styles.segmentedButtons}
          />
          
          <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Due Date (Optional)
          </Text>
          
          <View style={styles.dateContainer}>
            <TextInput
              mode="outlined"
              label="Due Date"
              value={dueDate ? dueDate.toLocaleDateString() : ''}
              onPressIn={() => setShowDatePicker(true)}
              right={
                dueDate ? (
                  <TextInput.Icon icon="close" onPress={handleClearDueDate} />
                ) : undefined
              }
              style={styles.dateInput}
              editable={false}
              showSoftInputOnFocus={false}
            />
            
            <AppButton
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
              icon="calendar"
            >
              {dueDate ? 'Change Date' : 'Select Date'}
            </AppButton>
          </View>
          
          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'default' : 'calendar'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          
          <View style={styles.buttonContainer}>
            <AppButton
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </AppButton>
            
            <AppButton
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
            >
              Cancel
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.m,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: spacing.l,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: fontSizes.m,
    fontWeight: '500',
    marginTop: spacing.m,
    marginBottom: spacing.s,
  },
  segmentedButtons: {
    marginBottom: spacing.m,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  dateInput: {
    flex: 1,
    marginRight: spacing.s,
  },
  dateButton: {
    minWidth: 130,
  },
  buttonContainer: {
    marginTop: spacing.l,
  },
  saveButton: {
    marginBottom: spacing.m,
  },
  cancelButton: {},
});

export default AddEditTaskScreen;
