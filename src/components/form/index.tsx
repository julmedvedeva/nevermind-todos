import { TaskInputProps } from './index.interface';
import CheckIcon from '../icons/index';
import styles from './index.module.scss';

function Form({ inputValue, handleSubmit, handleChange }: TaskInputProps) {
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="form">
        <button className={styles.button} type="submit">
          <CheckIcon />
        </button>
        <input className="input" type="text" id="input" name="input" value={inputValue} onChange={handleChange} />
      </form>
    </div>
  );
}

export default Form;
