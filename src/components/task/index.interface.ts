export interface ITask {
  task: string;
  id: number;
  isCompleted: boolean;
}
export interface TaskProps extends ITask {
  handleClick: (id: number) => void;
}
