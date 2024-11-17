import { ITask } from '../components/task/index.interface';
import { CreateTaskProps } from './createTask.interface';

export const createTask = async ({ inputValue, setInputValue, error, setError, tasks, setTasks }: CreateTaskProps) => {
  if (inputValue.trim()) {
    try {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        setError(!error);
        throw new Error('Something went wrong');
      }

      const createdTask: ITask = {
        id: Date.now(),
        task: inputValue,
        isCompleted: false,
      };
      const newArr = [...tasks, createdTask];
      setTasks(newArr);
      setInputValue('');
      localStorage.setItem('tasks', JSON.stringify(newArr));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
};
