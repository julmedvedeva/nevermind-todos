import classes from './index.module.scss';
import ButtonProps from './index.interface';
export function Button({ filter, handleFilterChange, children, isActive }: ButtonProps) {
  const buttonClass = isActive ? `${classes.button} ${classes.active}` : classes.button;
  return (
    <button className={buttonClass} onClick={() => handleFilterChange(filter)}>
      {children}
    </button>
  );
}
