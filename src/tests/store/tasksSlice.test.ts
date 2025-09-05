import tasksReducer, {
  setFilter,
  clearFilters,
} from '../../store/slices/tasksSlice';
import { TasksState } from '../../types';

describe('Tasks Slice', () => {
  // Initial state for testing
  const initialState: TasksState = {
    tasks: [
      {
        id: '1',
        title: 'Test Task 1',
        description: 'Description for test task 1',
        completed: false,
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: '1',
      },
      {
        id: '2',
        title: 'Test Task 2',
        description: 'Description for test task 2',
        completed: true,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: '1',
      },
    ],
    filteredTasks: [],
    isLoading: false,
    error: null,
    filter: {
      status: 'all',
      priority: 'all',
      searchQuery: '',
    },
  };

  it('should handle initial state', () => {
    // @ts-ignore - We're not providing the full action object for this test
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual({
      tasks: [],
      filteredTasks: [],
      isLoading: false,
      error: null,
      filter: {
        status: 'all',
        priority: 'all',
        searchQuery: '',
      },
    });
  });

  it('should handle setFilter for status', () => {
    const actual = tasksReducer(
      initialState,
      setFilter({ status: 'completed' })
    );
    
    // Check if filter is updated
    expect(actual.filter.status).toEqual('completed');
    
    // Check if filteredTasks contains only completed tasks
    expect(actual.filteredTasks.length).toEqual(1);
    expect(actual.filteredTasks[0].id).toEqual('2');
    expect(actual.filteredTasks[0].completed).toBeTruthy();
  });

  it('should handle setFilter for priority', () => {
    const actual = tasksReducer(
      initialState,
      setFilter({ priority: 'high' })
    );
    
    // Check if filter is updated
    expect(actual.filter.priority).toEqual('high');
    
    // Check if filteredTasks contains only high priority tasks
    expect(actual.filteredTasks.length).toEqual(1);
    expect(actual.filteredTasks[0].id).toEqual('1');
    expect(actual.filteredTasks[0].priority).toEqual('high');
  });

  it('should handle setFilter for searchQuery', () => {
    const actual = tasksReducer(
      initialState,
      setFilter({ searchQuery: 'Task 2' })
    );
    
    // Check if filter is updated
    expect(actual.filter.searchQuery).toEqual('Task 2');
    
    // Check if filteredTasks contains only tasks matching the search query
    expect(actual.filteredTasks.length).toEqual(1);
    expect(actual.filteredTasks[0].id).toEqual('2');
    expect(actual.filteredTasks[0].title).toContain('Task 2');
  });

  it('should handle clearFilters', () => {
    // First set some filters
    let state = tasksReducer(
      initialState,
      setFilter({ status: 'completed', priority: 'high' })
    );
    
    // Then clear filters
    state = tasksReducer(state, clearFilters());
    
    // Check if filters are reset to default
    expect(state.filter).toEqual({
      status: 'all',
      priority: 'all',
      searchQuery: '',
    });
    
    // Check if filteredTasks contains all tasks
    expect(state.filteredTasks.length).toEqual(state.tasks.length);
  });
});
