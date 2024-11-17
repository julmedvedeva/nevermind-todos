import './index.module.scss';
import { TitleProps } from './index.interface';

function Title({ title }: TitleProps) {
  return <h1 className="title">{title}</h1>;
}

export default Title;
