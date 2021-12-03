import React, { FunctionComponent } from "react";

interface OwnProps {
  content: string,
  keyword?: string,
  highlightStyle?: React.CSSProperties,
}

type Props = OwnProps;

const Mark: FunctionComponent<Props> = (props) => {
  const { content, highlightStyle, keyword } = props;
  if(!keyword){
    return <>{content}</>
  }
  const arr = content.split(keyword)
  return <div>{
    arr.map((str,index)=><span key={index}>
      {str}{index === arr.length-1?null:<span style={highlightStyle||{color: '#257AFD'}}>{keyword}</span>}
    </span>)
  }</div>;
};

export default Mark;
