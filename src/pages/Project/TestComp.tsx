
import React, { FunctionComponent } from 'react';

interface OwnProps {}

type Props = OwnProps;

const TestComp: FunctionComponent<Props> = (props) => {
  return (<div>test</div>);
};

TestComp.whyDidYouRender = true

export default TestComp;
