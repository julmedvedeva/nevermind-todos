import { ITask } from '../components/task/index.interface';

export interface CreateTaskProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
  error: boolean;
  setError: (error: boolean) => void;
}
