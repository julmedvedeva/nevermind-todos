import { FormEvent, useEffect, useMemo, useState } from 'react';
import './App.scss';
import { library } from './components/dictionary';
import Form from './components/form';
import Task from './components/task';
import { ITask } from './components/task/index.interface';
import Title from './components/title';
import { Button } from './components/buttons/default';
import { ClearButton } from './components/buttons/clear';
import { createTask } from './utils/createTask';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [error, setError] = useState<boolean>(false);

  const completedTasksCount = useMemo(() => tasks.filter((task) => task.isCompleted).length, [tasks]);

  // useMemo необходим для избегания повторного вычисления
  // пересчет будет только когда изменится общее количество задач
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.isCompleted);
      case 'completed':
        return tasks.filter((task) => task.isCompleted);
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createTask({ inputValue, setInputValue, error, setError, tasks, setTasks });
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  const handleChange = (e: FormEvent) => setInputValue((e.target as HTMLInputElement).value);

  const handleClick = (id: number): void => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    setActiveFilter(filter);
  };

  const handleClearCompleted = () => {
    const newTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className="app">
      <a target="_blank" className="sourcelink" href="https://github.com/julmedvedeva/nevermind-todos">
        {library.sourceTitle}
      </a>
      {error === true && <h1>{library.errorTitle}</h1>}
      {error === false && (
        <>
          <Title title={library.title} />
          <div className="wrapper">
            <Form handleSubmit={handleSubmit} inputValue={inputValue} handleChange={handleChange} />
            <ul className="task-list">
              {filteredTasks.length > 0 &&
                filteredTasks.map((task: ITask) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    task={task.task}
                    isCompleted={task.isCompleted}
                    handleClick={handleClick}
                  />
                ))}
            </ul>
            <div className="navigation">
              {tasks.length > 0 && (
                <div>
                  <p>{`${completedTasksCount} items left`}</p>
                </div>
              )}
              <div className="group">
                <Button filter="all" isActive={activeFilter === 'all'} handleFilterChange={handleFilterChange}>
                  {library.btnAll}
                </Button>
                <Button filter="active" isActive={activeFilter === 'active'} handleFilterChange={handleFilterChange}>
                  {library.btnUncomplet}
                </Button>
                <Button
                  filter="completed"
                  isActive={activeFilter === 'completed'}
                  handleFilterChange={handleFilterChange}
                >
                  {library.btnComplet}
                </Button>
              </div>
              <div className="clearing">
                <ClearButton
                  handleClearCompleted={handleClearCompleted}
                  isDisabled={!filteredTasks.some((task) => task.isCompleted)}
                >
                  {library.btnClear}
                </ClearButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
