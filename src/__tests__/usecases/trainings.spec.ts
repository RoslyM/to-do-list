import taskReducer, { addTask, updateTask, deleteTask } from '../../domain/usecases/taskSlice';
import { Task } from '../../domain/entities/task';

describe('taskSlice', () => {
    const initialState = {tasks: [] as Task[]} ;

  it('should handle initial state', () => {
    expect(taskReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTask', () => {
    const newTask: Task = {
        id: '1', libelle: 'Test Task', description: 'Test Description', dueDate: '',
        status: 'en cours'
    };
    
    const actual = taskReducer(initialState, addTask(newTask));
    
    expect(actual.tasks.length).toBe(1);
    expect(actual.tasks[0]).toEqual(newTask);
  });

  it('should handle updateTask', () => {
    const existingTask: Task = {
        id: '1', libelle: 'Existing Task', description: 'Existing Description',
        status: 'en cours'
    };
    const updatedTask: Task = {
        id: '1', libelle: 'Updated Task', description: 'Updated Description',
        status: 'en cours'
    };
    
    const initialStateWithTask = { tasks: [existingTask] };

    const actual = taskReducer(initialStateWithTask, updateTask(updatedTask));
    
    expect(actual.tasks.length).toBe(1);
    expect(actual.tasks[0]).toEqual(updatedTask);
  });

  it('should not update if task does not exist', () => {
    const existingTask: Task = {
        id: '1', libelle: 'Existing Task', description: 'Existing Description',
        status: 'en cours'
    };
    const nonExistentUpdate: Task = {
        id: '2', libelle: 'Non-existent Task', description: 'Non-existent Description',
        status: 'en cours'
    };
    
    const initialStateWithTask = { tasks: [existingTask] };

    const actual = taskReducer(initialStateWithTask, updateTask(nonExistentUpdate));
    
    expect(actual.tasks.length).toBe(1);
    expect(actual.tasks[0]).toEqual(existingTask);
  });

  it('should handle deleteTask', () => {
    const existingTask: Task = {
        id: '1', libelle: 'Existing Task', description: 'Existing Description',
        status: 'en cours'
    };
    const initialStateWithTask = { tasks: [existingTask] };
    
    const actual = taskReducer(initialStateWithTask, deleteTask('1'));
    
    expect(actual.tasks.length).toBe(0);
  });

  it('should not delete if task ID does not exist', () => {
    const existingTask: Task = {
      id: '1',
      libelle: 'Existing Task',
      description: 'Existing Description',
      status: 'en cours'
    };
    const initialStateWithTask = { tasks: [existingTask] };
    const actual = taskReducer(initialStateWithTask, deleteTask('2'));
    expect(actual.tasks.length).toBe(1);
    expect(actual.tasks[0]).toEqual(existingTask);
    expect(actual.tasks[0].id).toBe('1');
  });
});
