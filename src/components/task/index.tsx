import { TaskProps } from './index.interface';
import classes from './index.module.scss';

function Task({ id, task, isCompleted, handleClick }: TaskProps) {
  return (
    <li
      className={`${isCompleted ? classes.checked : ''} ${isCompleted ? classes.completed : ''}`}
      onClick={() => handleClick(id)}
    >
      {task}
    </li>
  );
}

export default Task;
