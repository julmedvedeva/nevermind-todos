import ClearButtonProps from './index.interface';
import classes from './index.module.scss';
export function ClearButton({ isDisabled, handleClearCompleted, children }: ClearButtonProps) {
  const buttonClass = isDisabled ? `${classes.button} ${classes.disabled}` : classes.button;
  return (
    <button className={buttonClass} disabled={isDisabled} onClick={handleClearCompleted}>
      {children}
    </button>
  );
}
