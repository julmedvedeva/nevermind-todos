import { ITask } from '../components/task/index.interface';
import { createTask } from './createTask';

describe('createTask', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    };
    jest.spyOn(console, 'error').mockImplementation(() => {}); // чтобы подавить ошибки в тестовом выводе
  });

  afterEach(() => {
    jest.restoreAllMocks(); // сбрасываем все моки после каждого теста
  });
  it('должно создать новое дело и добавить его в массив', async () => {
    const inputValue = 'Новое дело';
    const setInputValue = jest.fn();
    const error = false;
    const setError = jest.fn();
    const tasks: ITask[] = [];
    const setTasks = jest.fn();
    jest.spyOn(Math, 'random').mockImplementation(() => 0.6);

    await createTask(inputValue, setInputValue, error, setError, tasks, setTasks);

    expect(setTasks).toHaveBeenCalledTimes(1);
    expect(setTasks).toHaveBeenCalledWith([
      {
        id: expect.any(Number),
        task: inputValue,
        isCompleted: false,
      },
    ]);
    expect(setInputValue).toHaveBeenCalledTimes(1);
    expect(setInputValue).toHaveBeenCalledWith('');
    expect(global.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(global.localStorage.setItem).toHaveBeenCalledWith('tasks', expect.any(String));
  });

  it('должно вызвать ошибку, если произойдет исключение', async () => {
    const inputValue = 'Новое дело';
    const setInputValue = jest.fn();
    const initialError = false;
    const setError = jest.fn();
    const tasks: ITask[] = [];
    const setTasks = jest.fn();

    jest.spyOn(Math, 'random').mockImplementation(() => 0.4);
    //нужно для теста асинхронности
    expect.assertions(0);

    try {
      await createTask(inputValue, setInputValue, initialError, setError, tasks, setTasks);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Something went wrong');
      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith(true);
      expect(console.error).toHaveBeenCalledTimes(1);
    }
  });

  it('не должно создавать новое дело, если оно пустое', async () => {
    const inputValue = '';
    const setInputValue = jest.fn();
    const error = false;
    const setError = jest.fn();
    const tasks: ITask[] = [];
    const setTasks = jest.fn();

    await createTask(inputValue, setInputValue, error, setError, tasks, setTasks);

    expect(setTasks).not.toHaveBeenCalled();
    expect(setInputValue).not.toHaveBeenCalled();
    expect(global.localStorage.setItem).not.toHaveBeenCalled();
  });
});
