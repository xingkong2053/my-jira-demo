import React, { FunctionComponent } from 'react';
import { Rate } from "antd";

interface OwnProps extends Omit<React.ComponentProps<typeof Rate>,'count'|'value'|'onChange'>{
  stared: boolean,
  onStarChange?: (stared: boolean) => void
}

type Props = OwnProps;

const Star: FunctionComponent<Props> = (props) => {
  const { stared, onStarChange ,...restProps} = props
  return <Rate count={1} value={stared?1:0} onChange={value => onStarChange?.(value !== 0)} {...restProps}/>;
};

export default Star;
