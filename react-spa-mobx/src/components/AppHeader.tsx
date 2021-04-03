import React from "react";
import styled from "@emotion/styled";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
`;

const AppHeader: React.FunctionComponent<IProps> = ({ ...rest }) => (
  <Root {...rest}>This is header</Root>
);

export default AppHeader;
