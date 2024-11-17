import { TaskInputProps } from './index.interface';
import CheckIcon from '../icons/index';
import styles from './index.module.scss';
import { library } from '../dictionary';

function Form({ inputValue, handleSubmit, handleChange }: TaskInputProps) {
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button className={styles.button} type="submit">
          <CheckIcon />
        </button>
        <input
          className={styles.input}
          autoComplete="off"
          type="text"
          id="input"
          name="input"
          value={inputValue}
          onChange={handleChange}
          placeholder={library.placeholder}
        />
      </form>
    </div>
  );
}

export default Form;
