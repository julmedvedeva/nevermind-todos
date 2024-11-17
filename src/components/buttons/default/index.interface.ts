type FilterChangeHandler = (filter: 'all' | 'active' | 'completed') => void;
interface ButtonProps {
  filter: 'all' | 'active' | 'completed';
  handleFilterChange: FilterChangeHandler;
  children: React.ReactNode;
  isActive?: boolean;
}

export default ButtonProps;
