import React from "react";
import styled from "@emotion/styled";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const Root = styled.div`
  cursor: pointer;
  border: 1px solid black;
  width: fit-content;
  display: flex;
  flex-direction: row;
`;
const Example: React.FC<IProps> = ({ text, children, onClick, ...rest }) => {
  return (
    <Root onClick={onClick} {...rest}>
      {text}
      {children}
    </Root>
  );
};
export default Example;
