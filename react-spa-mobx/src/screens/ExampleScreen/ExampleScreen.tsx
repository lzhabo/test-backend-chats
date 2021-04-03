import React from "react";
import styled from "@emotion/styled";
import Example from "@components/Example";
import { useStores } from "@stores/useStores";
import { useObserver } from "mobx-react-lite";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const ExampleScreen: React.FC<IProps> = () => {
  const { settingsStore } = useStores();

  return (
    <Root>
      {useObserver(() => (
        <Example
          text={settingsStore.selectedLanguage}
          onClick={settingsStore.toggleLanguage.bind(settingsStore)}
        />
      ))}
    </Root>
  );
};
export default ExampleScreen;
