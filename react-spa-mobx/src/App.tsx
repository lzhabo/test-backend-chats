import React from "react";
import styled from "@emotion/styled";
import { Route, Switch } from "react-router-dom";
import ExampleScreen from "@src/screens/ExampleScreen";
import { ROUTES } from "@stores/RouterStore";
import AppHeader from "@components/AppHeader";

interface IProps {}

const Root = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 50px 20px 0 20px;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  background: url("/assets/bg.svg");
`;

const App: React.FunctionComponent<IProps> = () => {
  return (
    <Root>
      <AppHeader />
      <Switch>
        <Route path={ROUTES.ROOT}>
          <ExampleScreen />
        </Route>
      </Switch>
    </Root>
  );
};

export default App;
